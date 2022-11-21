import {HttpErrorResponse} from "@angular/common/http";
import {createAction, props} from "@ngrx/store";
import {User} from "src/app/common/models/user.model";
import {OrderBy} from "../types/order.type";
import {SortBy} from "../types/sort.type";

export const loadUsers = createAction(
  '[User Dashboard] Load users',
  props<{ start: number, end: number, sort: SortBy, order: OrderBy, search: string }>()
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

export const emptyUserList = createAction(
  '[User Dashboard] Empty user list'
);

export const userSearch = createAction(
  '[User Dashboard] User search',
  props<{ searchValue: string }>()
)