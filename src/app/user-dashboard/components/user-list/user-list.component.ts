import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild} from "@angular/core";
import {FormControl} from "@angular/forms";
import {fromEvent, map, Observable, takeUntil, BehaviorSubject, shareReplay, withLatestFrom, mergeWith, combineLatest, of} from "rxjs";
import {auditTime, distinctUntilChanged, filter, startWith, switchMap, take} from "rxjs/operators";
import {User} from "src/app/common/models/user.model";
import {Destroyable} from "src/app/common/utils/destroyable";
import {UserStoreFacade} from "../../services/user-store.facade";
import {OrderBy} from "../../types/order.type";
import {SortBy} from "../../types/sort.type";

@Component({
  selector: 'app-user-list',
  template: `
    <ng-container *ngIf="(vm$ | async) as vm">
      <div class="list-header">
        <span class="header-count">{{vm.selectedCount}} {{vm.selectedCount === 1 ? 'user' : 'users'}} selected</span>
        <div class="header-actions">
          <button app-action-icon
            [iconName]="'pencil'"
            [title]="'Edit'">
          </button>
          <button app-action-icon
            [iconName]="'trash'"
            [title]="'Delete'"
            (click)="deleteAllSelected()">
          </button>
        </div>
      </div>
      <div class="list-filters">
        <app-checkbox [formControl]="masterCheckboxControl"></app-checkbox>
        <button class="filter-button" (click)="sortBy('name')">
          User
          <span *ngIf="sort === 'name'" class="carret" [ngClass]="{'desc': order === 'desc'}">▼</span>
        </button>
        <button class="filter-button" (click)="sortBy('role')">
          Permission
          <span *ngIf="sort === 'role'" class="carret" [ngClass]="{'desc': order === 'desc'}">▼</span>
        </button>
      </div>
      <div #listContainer class="list-items-container">
        <app-user-list-item *ngFor="let user of vm.users; last as last; trackBy: trackById"
          [id]="last ? LAST_USER_LIST_ITEM_ID : ''"
          [user]="user">
        </app-user-list-item>
      </div>
    </ng-container>
  `,
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent extends Destroyable implements AfterViewInit {
  @ViewChild('listContainer', { read: ElementRef }) private listContainerElement: ElementRef<HTMLElement>;
  
  readonly LAST_USER_LIST_ITEM_ID = 'last-list-item';
  private readonly HEIHT_OF_LIST_ITEM = 78;
  private resizeObserver: ResizeObserver;

  private userCountPerPage$: Observable<number>;
  private lastLoadedIndex$ = new BehaviorSubject<number>(0);

  sort: SortBy;
  order: OrderBy;

  users$ = this.userStoreFacade.select.users();
  selectedUserCount$ = this.userStoreFacade.select.selectedUserCount();
  searchValue$ = this.userStoreFacade.select.searchValue();
  masterCheckboxControl = new FormControl(false);

  vm$ = combineLatest([
    this.users$,
    this.selectedUserCount$
  ]).pipe(map(([users, selectedCount]) => ({ users, selectedCount })));

  constructor(
    private userStoreFacade: UserStoreFacade,
    private cd: ChangeDetectorRef,
  ) {
    super();
  }

  ngAfterViewInit(): void {
    // For some reason change detection cycle is not initiated when vm$ emits values.
    this.vm$.pipe(takeUntil(this.destroyed$)).subscribe(() => this.cd.detectChanges());
    this.handleMasterCheckboxToggle();

    this.userCountPerPage$ = this.observeContainerHeight().pipe(
      map(containerHeight => Math.ceil(containerHeight / this.HEIHT_OF_LIST_ITEM) + 1),
      shareReplay(1)
    );

    const lastChild$ = this.users$.pipe(
      map(() => this.listContainerElement.nativeElement.querySelector(`#${this.LAST_USER_LIST_ITEM_ID}`)),
      filter(child => !!child)
    );

    const lastChildInView$ = lastChild$.pipe(
      switchMap(lastChild => {
        return fromEvent(this.listContainerElement.nativeElement, 'scroll').pipe(
          map(scrollEvent => this.isLastChildInView(lastChild, scrollEvent.target as Element)),
          filter(isInView => isInView),
          take(1)
        )
      })
    );

    const loadUsers$ = lastChildInView$.pipe(
      mergeWith(this.users$.pipe(filter(users => !users.length))),
      switchMap(() => this.userCountPerPage$.pipe(take(1))),
      auditTime(50),
    );

    loadUsers$.pipe(
      filter(val => val !== 0),
      withLatestFrom(this.searchValue$),
      takeUntil(this.destroyed$)
    ).subscribe(([usersToAdd, searchValue]) => {
      const untilIndex = this.lastLoadedIndex$.value + usersToAdd;
      this.userStoreFacade.dispatch.loadUsers(
        this.lastLoadedIndex$.value,
        untilIndex,
        this.sort,
        this.order,
        searchValue
      );
      this.lastLoadedIndex$.next(untilIndex);
    });
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.resizeObserver.disconnect();
  }

  deleteAllSelected(): void {
    this.userStoreFacade.dispatch.deleteAllSelectedUsers();
  }

  trackById(index: number, user: User) {
    return user.id;
  }

  sortBy(sort: SortBy) {
    if (this.sort !== sort) {
      this.order = 'asc';
    } else {
      this.order = (this.order === 'asc' ? 'desc' : 'asc');
    }
    this.sort = sort;

    this.userStoreFacade.dispatch.emptyUserList();
    this.lastLoadedIndex$.next(0);
  }

  private handleMasterCheckboxToggle() {
    this.masterCheckboxControl.valueChanges.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(checked => {
      checked ?
        this.userStoreFacade.dispatch.allUsersSelected() :
        this.userStoreFacade.dispatch.allUsersDeselected();
    });

    this.selectedUserCount$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(count => this.masterCheckboxControl.setValue(!!count, { emitEvent: false }));
  }

  private observeContainerHeight(): Observable<number> {
    return new Observable<number>(subscriber => {
      this.resizeObserver = new ResizeObserver(entries => {
        subscriber.next(entries[0].target.clientHeight);
      });

      this.resizeObserver.observe(this.listContainerElement.nativeElement);
    }).pipe(
      startWith(this.listContainerElement.nativeElement.clientHeight),
      distinctUntilChanged()
    );
  }

  private isLastChildInView(lastChild: Element, listElement: Element): any {
    return lastChild.getBoundingClientRect().top < listElement.getBoundingClientRect().top + listElement.clientHeight;
  }
}