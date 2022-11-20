import {createFeatureSelector, createSelector} from "@ngrx/store";
import {adapterUsers, UserDashboardState} from "./user-dashboard.reducer";

const selectState = createFeatureSelector<UserDashboardState>('userState');
const selectUsers = createSelector(selectState, state => state.users);

export const {
  selectAll: selectAllUsers,
  selectTotal: totalUsersCount
} = adapterUsers.getSelectors(selectUsers);

export const selectedUserIds = createSelector(
  selectState,
  state => state.selectedUserIds
);

export const selectUserIsSelected = (id: number) => createSelector(
  selectState,
  state => state.selectedUserIds.some(userId => userId === id)
);

export const selectedUserCount = createSelector(
  selectedUserIds,
  selectedUserIds => selectedUserIds.length
);
