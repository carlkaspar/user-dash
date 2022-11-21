import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import {User} from 'src/app/common/models/user.model';
import * as actions from './user-dashboard.actions';

export interface UserDashboardState {
  users: EntityState<User>;
  selectedUserIds: number[];
  searchValue: string
}

export const adapterUsers = createEntityAdapter<User>({
  selectId: (user) => user.id
});

const initialState: UserDashboardState = {
  users: adapterUsers.getInitialState(),
  selectedUserIds: [],
  searchValue: null
}

export const userDashboardState = createReducer(
  initialState,
  on(actions.loadUsersSuccess, (state, action) => ({
    ...state,
    users: adapterUsers.setMany(action.users, state.users)
  })),
  on(actions.userSelected, (state, action) => ({
    ...state,
    selectedUserIds: [...state.selectedUserIds, action.user.id]
  })),
  on(actions.userDeselected, (state, action) => ({
    ...state,
    selectedUserIds: state.selectedUserIds.filter(id => id !== action.user.id)
  })),
  on(actions.allUsersSelected, state => ({
    ...state,
    selectedUserIds: state.users.ids as number[]
  })),
  on(actions.allUsersDeselected, state => ({
    ...state,
    selectedUserIds: []
  })),
  on(actions.emptyUserList, state => ({
    ...state,
    users: adapterUsers.getInitialState(),
    selectedUserIds: []
  })),
  on(actions.userSearch, (state, action) => ({
    ...state,
    users: adapterUsers.getInitialState(),
    selectedUserIds: [],
    searchValue: action.searchValue
  }))
);