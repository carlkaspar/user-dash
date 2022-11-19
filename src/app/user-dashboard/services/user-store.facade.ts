import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {User} from 'src/app/common/models/user.model';
import {allUsersDeselected, allUsersSelected, loadUsers, userDeselected, userSelected} from '../state/user-dashboard.actions';
import {UserDashboardState} from '../state/user-dashboard.reducer';
import {selectAllUsers, selectedUserIds, selectUserIsSelected} from '../state/user-dashboard.selectors';

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

    selectedUserIds() {
      return this.store.pipe(select(selectedUserIds));
    }

    isUserSelected(id: number) {
      return this.store.pipe(select(selectUserIsSelected(id)));
    }

  })(this.store);

  dispatch = new (class {
    constructor(private store: Store<UserDashboardState>) {}

    loadUsers() {
      this.store.dispatch(loadUsers());
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

  })(this.store);
}