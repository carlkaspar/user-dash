import {createFeatureSelector, createSelector} from "@ngrx/store";
import {adapterUsers, UserDashboardState} from "./user-dashboard.reducer";

const selectState = createFeatureSelector<UserDashboardState>('userState');
const selectUsers = createSelector(selectState, state => state.users);

export const {
  selectAll: selectAllUsers
} = adapterUsers.getSelectors(selectUsers);