import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {User} from 'src/app/common/models/user.model';
import {allUsersDeselected, allUsersSelected, loadUsers, emptyUserList, userDeselected, userSearch, userSelected} from '../state/user-dashboard.actions';
import {UserDashboardState} from '../state/user-dashboard.reducer';
import {selectAllUsers, selectedUserCount, selectedUserIds, selectSearchValue, selectUserIsSelected, totalUsersCount} from '../state/user-dashboard.selectors';
import {OrderBy} from '../types/order.type';
import {SortBy} from '../types/sort.type';

@Injectable({
  providedIn: 'root'
})
export class UserStoreFacade {
  constructor(private store: Store<UserDashboardState>) {}

  select = new (class {
    constructor(private store: Store<UserDashboardState>) {}

    users() {
      return this.store.pipe(select(selectAllUsers));
    }

    totalUsersCount() {
      return this.store.pipe(select(totalUsersCount));
    }

    selectedUserIds() {
      return this.store.pipe(select(selectedUserIds));
    }

    selectedUserCount() {
      return this.store.pipe(select(selectedUserCount));
    }

    isUserSelected(id: number) {
      return this.store.pipe(select(selectUserIsSelected(id)));
    }

    searchValue() {
      return this.store.pipe(select(selectSearchValue))
    }

  })(this.store);

  dispatch = new (class {
    constructor(private store: Store<UserDashboardState>) {}

    loadUsers(
      start: number,
      end: number,
      sort: SortBy,
      order: OrderBy,
      search: string
    ) {
      this.store.dispatch(loadUsers({ start, end, sort, order, search }));
    }

    userSelected(user: User) {
      this.store.dispatch(userSelected({ user }))
    }

    userDeselected(user: User) {
      this.store.dispatch(userDeselected({ user }))
    }

    allUsersSelected() {
      this.store.dispatch(allUsersSelected());
    }

    allUsersDeselected() {
      this.store.dispatch(allUsersDeselected());
    }

    emptyUserList() {
      this.store.dispatch(emptyUserList());
    }

    userSearch(searchValue: string) {
      this.store.dispatch(userSearch({ searchValue }))
    }

  })(this.store);
}