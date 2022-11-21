import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {from, of} from "rxjs";
import {catchError, concatMap, delay, map, switchMap, take, tap} from "rxjs/operators";
import {User} from "src/app/common/models/user.model";
import {UserService} from "../services/user.service";
import {deleteAllSelectedUsers, deleteAllSelectedUsersSuccess, deleteUser, deleteUserSuccess, loadUsers, loadUsersFailure, loadUsersSuccess} from "./user-dashboard.actions";
import {UserDashboardState} from "./user-dashboard.reducer";
import {selectedUserIds} from "./user-dashboard.selectors";

@Injectable()
export class UserDashboardEffects {

  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(loadUsers),
    switchMap(action => this.userService.getUsers(action.start, action.end, action.sort, action.order, action.search).pipe(
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

  deleteUser$ = createEffect(() => this.actions$.pipe(
    ofType(deleteUser),
    switchMap(action => this.userService.deleteUser(action.userId).pipe(
      map(() => deleteUserSuccess({ userId: action.userId })),
      catchError(error => of(loadUsersFailure({ error })))
    ))
  ));

  deleteAllSelectedUsers$ = createEffect(() => this.actions$.pipe(
    ofType(deleteAllSelectedUsers),
    concatMap(() => this.store.select(selectedUserIds).pipe(
      take(1),
      switchMap(userIds => this.userService.deleteManyUsers(userIds).pipe(
        map(() => deleteAllSelectedUsersSuccess({ deletedUserIds: userIds }))
      ))
    ))
  ));

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store<UserDashboardState>
  ) {}
}