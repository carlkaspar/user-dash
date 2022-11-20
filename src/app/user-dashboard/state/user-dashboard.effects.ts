import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {of} from "rxjs";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {User} from "src/app/common/models/user.model";
import {UserService} from "../services/user.service";
import {loadUsers, loadUsersFailure, loadUsersSuccess} from "./user-dashboard.actions";

@Injectable()
export class UserDashboardEffects {

  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(loadUsers),
    switchMap(action => this.userService.getUsers(action.start, action.end).pipe(
      map(users => loadUsersSuccess({ users: users as User[] })),
      catchError(error => of(loadUsersFailure({ error })))
    ))
  ));

  loadUsersFailure$ = createEffect(() => this.actions$.pipe(
    ofType(loadUsersFailure),
    tap(error => {
      // TODO: Alert user about error.
    })
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}