import {HttpErrorResponse} from "@angular/common/http";
import {createAction, props} from "@ngrx/store";
import {User} from "src/app/common/models/user.model";

export const loadUsers = createAction(
  '[User Dashboard] Load users',
  props<{ start: number, end: number, sort: 'role' | 'name', order: 'asc' | 'desc' }>()
);

export const loadUsersFailure = createAction(
  '[User Dashboard] Load users failure',
  props<{ error: HttpErrorResponse }>()
);

export const loadUsersSuccess = createAction(
  '[User Dashboard] Load users success',
  props<{ users: User[] }>()
);

export const userSelected = createAction(
  '[User Dashboard] User selected',
  props<{ user: User }>()
);

export const userDeselected = createAction(
  '[User Dashboard] User deselected',
  props<{ user: User }>()
);

export const allUsersDeselected = createAction(
  '[User Dashboard] All users selected'
);

export const allUsersSelected = createAction(
  '[User Dashboard] All users deselected'
);

export const sortUserList = createAction(
  '[User Dashboard] Sort user list'
);