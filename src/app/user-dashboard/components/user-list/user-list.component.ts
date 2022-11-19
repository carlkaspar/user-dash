import { ChangeDetectionStrategy, Component } from "@angular/core";
import {FormControl} from "@angular/forms";
import {map, Observable, takeUntil} from "rxjs";
import {User} from "src/app/common/models/user.model";
import {Destroyable} from "src/app/common/utils/destroyable";
import {UserStoreFacade} from "../../services/user-store.facade";

@Component({
  selector: 'app-user-list',
  template: `
    <div class="list-header">
      <span class="header-count">{{(selectedUserCount$ | async)}} {{(selectedUserCount$ | async) === 1 ? 'user' : 'users'}} selected</span>
      <div class="header-actions">
        <button app-action-icon
          [iconName]="'pencil'"
          [title]="'Edit'">
        </button>
        <button app-action-icon
          [iconName]="'trash'"
          [title]="'Delete'">
        </button>
      </div>
    </div>
    <div class="list-filters">
      <app-checkbox [formControl]="masterCheckboxControl"></app-checkbox>
      <span>User</span>
      <span>Permission</span>
    </div>
    <div class="list-items-container">
      <app-user-list-item *ngFor="let user of (users$ | async)"
        [user]="user">
      </app-user-list-item>
    </div>
  `,
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent extends Destroyable {
  users$: Observable<User[]> = this.userStoreFacade.select.users();
  masterCheckboxControl = new FormControl(false);
  selectedUserCount$ = this.userStoreFacade.select.selectedUserIds().pipe(
    map(userIds => userIds.length)
  );

  constructor(private userStoreFacade: UserStoreFacade) {
    super();

    this.userStoreFacade.dispatch.loadUsers();

    this.userStoreFacade.select.selectedUserIds().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(ids => {
      const isAnyUserSelected = !!ids.length;
      this.masterCheckboxControl.setValue(isAnyUserSelected, { emitEvent: false });
    });

    this.masterCheckboxControl.valueChanges.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(checked => {
      checked ?
        this.userStoreFacade.dispatch.allUsersSelected() :
        this.userStoreFacade.dispatch.allUsersDeselected();
    })
  }
}