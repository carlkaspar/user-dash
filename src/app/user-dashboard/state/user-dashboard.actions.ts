import {HttpErrorResponse} from "@angular/common/http";
import {createAction, props} from "@ngrx/store";
import {User} from "src/app/common/models/user.model";

export const loadUsers = createAction(
  '[User Dashboard] Load users'
);

export const loadUsersFailure = createAction(
  '[User Dashboard] Load users failure',
  props<{ error: HttpErrorResponse }>()
);

export const loadUsersSuccess = createAction(
  '[User Dashboard] Load users success',
  props<{ users: User[] }>()
);