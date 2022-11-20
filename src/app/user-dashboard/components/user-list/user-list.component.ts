import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild} from "@angular/core";
import {FormControl} from "@angular/forms";
import {fromEvent, map, Observable, takeUntil, BehaviorSubject, shareReplay, withLatestFrom, mergeWith} from "rxjs";
import {debounceTime, filter, switchMap} from "rxjs/operators";
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
      <button (click)="sortBy('name')">User</button>
      <button (click)="sortBy('role')">Permission</button>
    </div>
    <div #listContainer class="list-items-container">
      <ng-container *ngIf="(users$ | async) as users">
        <app-user-list-item *ngFor="let user of users; trackBy: trackById"
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

  private lastLoadedIndex$ = new BehaviorSubject<number>(0);

  private sort: 'role' | 'name';
  private order: 'asc' | 'desc';
  
  @ViewChild('listContainer', { read: ElementRef }) private listContainerElement: ElementRef<HTMLElement>;

  users$ = this.userStoreFacade.select.users();
  selectedUserCount$ = this.userStoreFacade.select.selectedUserCount();
  masterCheckboxControl = new FormControl(false);

  constructor(
    private userStoreFacade: UserStoreFacade,
    private cd: ChangeDetectorRef
  ) {
    super();
  }

  ngAfterViewInit(): void {
    // For some reason change detection cycle is not initiated when users$ emits its first value.
    // The code below is a hack to manually call change detection when the first value is emitted.
    // Otherwise the first users will not be shown on the site before something else triggers
    // change detection.
    this.users$.pipe(
      filter(val => !!val.length),
      mergeWith(this.selectedUserCount$),
      takeUntil(this.destroyed$)
    ).subscribe(() => this.cd.detectChanges());

    this.handleMasterCheckboxToggle();

    this.selectedUserCount$.pipe(takeUntil(this.destroyed$))
      .subscribe(count => this.masterCheckboxControl.setValue(!!count, { emitEvent: false }));

    this.userlistContainerHeight$ = this.observeContainerHeight().pipe(
      debounceTime(300),
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

    this.amountOfUsersToAdd$.pipe(
      filter(val => val !== 0),
      takeUntil(this.destroyed$)
    ).subscribe(usersToAdd => {
      const untilIndex = this.lastLoadedIndex$.value + usersToAdd;
      this.userStoreFacade.dispatch.loadUsers(
        this.lastLoadedIndex$.value,
        untilIndex,
        this.sort,
        this.order
      );
      this.lastLoadedIndex$.next(untilIndex);
    });
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.resizeObserver.disconnect();
  }

  trackById(index: number, user: User) {
    return user.id;
  }

  sortBy(sort: 'role' | 'name') {
    const lastSort = this.sort;
    this.sort = sort;

    if (lastSort !== this.sort) {
      this.order = 'asc';
    } else if (this.order === 'asc') {
      this.order = 'desc';
    } else {
      this.order = 'asc';
    }
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