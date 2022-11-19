import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import {User} from 'src/app/common/models/user.model';
import * as actions from './user-dashboard.actions';

export interface UserDashboardState {
  users: EntityState<User>;
  selectedUsers: User[];
}

export const adapterUsers = createEntityAdapter<User>({
  selectId: (user) => user.id
});

const initialState: UserDashboardState = {
  users: adapterUsers.getInitialState(),
  selectedUsers: []
}

export const userDashboardState = createReducer(
  initialState,
  on(actions.loadUsersSuccess, (state, action) => ({
    ...state,
    users: adapterUsers.setMany(action.users, state.users)
  }))
);