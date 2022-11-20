import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from "@angular/core";
import {FormControl} from "@angular/forms";
import {fromEvent, map, Observable, startWith, takeUntil, BehaviorSubject, shareReplay, withLatestFrom, of, mergeWith} from "rxjs";
import {filter, merge, switchMap} from "rxjs/operators";
import {User} from "src/app/common/models/user.model";
import {Destroyable} from "src/app/common/utils/destroyable";
import {UserStoreFacade} from "../../services/user-store.facade";

@Component({
  selector: 'app-user-list',
  template: `
    <div class="list-header">
      <span class="header-count">{{(selectedUserCount$ | async)}} {{(selectedUserCount$ | async) === 1 ? 'user' : 'users'}} selected</span>
      <div class="header-actions">
        <button app-action-icon
          [iconName]="'pencil'"
          [title]="'Edit'">
        </button>
        <button app-action-icon
          [iconName]="'trash'"
          [title]="'Delete'">
        </button>
      </div>
    </div>
    <div class="list-filters">
      <app-checkbox [formControl]="masterCheckboxControl"></app-checkbox>
      <span>User</span>
      <span>Permission</span>
    </div>
    <div #listContainer class="list-items-container">
      <ng-container *ngIf="(users$ | async) as users">
        <app-user-list-item *ngFor="let user of users"
          [user]="user">
        </app-user-list-item>
      </ng-container>
    </div>
  `,
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent extends Destroyable implements AfterViewInit {
  private readonly heightOfSingleListItem = 78;
  private resizeObserver: ResizeObserver;
  
  private userCountPerPage$: Observable<number>;
  private loadedUsersAmount$ = this.userStoreFacade.select.totalUsersCount();

  private userlistContainerHeight$: Observable<number>;
  private amountOfUsersToAdd$: Observable<number>;
  private loadNextPage$: Observable<void>;

  private currentPage$ = new BehaviorSubject<number>(1);
  
  @ViewChild('listContainer', { read: ElementRef }) private listContainerElement: ElementRef<HTMLElement>;

  users$ = this.userStoreFacade.select.users();
  selectedUserCount$ = this.userStoreFacade.select.selectedUserCount();
  masterCheckboxControl = new FormControl(false);

  constructor(private userStoreFacade: UserStoreFacade) {
    super();
  }
    
  ngAfterViewInit(): void {
    this.handleMasterCheckboxToggle();

    this.selectedUserCount$.pipe(takeUntil(this.destroyed$))
      .subscribe(count => this.masterCheckboxControl.setValue(!!count, { emitEvent: false }));

    this.userlistContainerHeight$ = this.observeContainerHeight().pipe(
      startWith(this.listContainerElement.nativeElement.clientHeight),
      shareReplay(1)
    );
    this.userCountPerPage$ = this.userlistContainerHeight$.pipe(
      map(containerHeight => Math.ceil(containerHeight / this.heightOfSingleListItem)),
      shareReplay(1)
    );

    this.loadNextPage$ = fromEvent(this.listContainerElement.nativeElement, 'scroll').pipe(
      map(scrollEvent => {
        const targetElement = scrollEvent.target as HTMLElement;
        return targetElement.scrollHeight - targetElement.clientHeight - targetElement.scrollTop;
      }),
      filter(scrollToBottom => scrollToBottom === 0),
      map(() => {})
    );
    
    this.amountOfUsersToAdd$ = this.userlistContainerHeight$.pipe(
      withLatestFrom(this.loadedUsersAmount$),
      map(([containerHeight, loadedUsersCount]) => this.calculateUsersToFillThePage(containerHeight, loadedUsersCount)),
      mergeWith(this.loadNextPage$.pipe(switchMap(() => this.userCountPerPage$)))
    );

    this.amountOfUsersToAdd$.pipe(takeUntil(this.destroyed$)).subscribe(usersToAdd => {
      this.userStoreFacade.dispatch.loadUsers(this.currentPage$.value, usersToAdd);
      this.currentPage$.next(this.currentPage$.value + 1);
    });
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.resizeObserver.disconnect();
  }

  private handleMasterCheckboxToggle() {
    this.masterCheckboxControl.valueChanges.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(checked => {
      checked ?
        this.userStoreFacade.dispatch.allUsersSelected() :
        this.userStoreFacade.dispatch.allUsersDeselected();
    });
  }

  private observeContainerHeight(): Observable<number> {
    return new Observable(subscriber => {
      this.resizeObserver = new ResizeObserver(entries => {
        subscriber.next(entries[0].target.clientHeight);
      });

      this.resizeObserver.observe(this.listContainerElement.nativeElement);
    });
  }

  private calculateUsersToFillThePage(containerHeight: number, loadedUsersAmount: number): number {
    const emptySpace = containerHeight - loadedUsersAmount * this.heightOfSingleListItem;
    
    if (emptySpace > 0) {
      return Math.ceil(emptySpace / this.heightOfSingleListItem);
    } else {
      return 0
    }
  }
}