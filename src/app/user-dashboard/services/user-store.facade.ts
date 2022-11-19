import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {loadUsers} from '../state/user-dashboard.actions';
import {UserDashboardState} from '../state/user-dashboard.reducer';
import {selectAllUsers} from '../state/user-dashboard.selectors';

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

  })(this.store);

  dispatch = new (class {
    constructor(private store: Store<UserDashboardState>) {}

    loadUsers() {
      this.store.dispatch(loadUsers());
    }

  })(this.store);
}