import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {User} from 'src/app/common/models/user.model';
import {allUsersDeselected, allUsersSelected, loadUsers, sortUserList, userDeselected, userSelected} from '../state/user-dashboard.actions';
import {UserDashboardState} from '../state/user-dashboard.reducer';
import {selectAllUsers, selectedUserCount, selectedUserIds, selectUserIsSelected, totalUsersCount} from '../state/user-dashboard.selectors';

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

  })(this.store);

  dispatch = new (class {
    constructor(private store: Store<UserDashboardState>) {}

    loadUsers(
      start: number,
      end: number,
      sort: 'role' | 'name',
      order: 'asc' | 'desc'
    ) {
      this.store.dispatch(loadUsers({ start, end, sort, order }));
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

    sortUserList() {
      this.store.dispatch(sortUserList());
    }

  })(this.store);
}