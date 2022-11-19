import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from "@angular/core";
import {FormControl} from "@angular/forms";
import {takeUntil} from "rxjs/operators";
import {User} from "src/app/common/models/user.model";
import {TagColor} from "src/app/common/types/tag-color.type";
import {Destroyable} from "src/app/common/utils/destroyable";
import {formatRole, roleTagColorMap} from "src/app/common/utils/role.util";
import {UserStoreFacade} from "../../services/user-store.facade";

@Component({
  selector: 'app-user-list-item',
  template: `
    <app-checkbox [formControl]="userSelectedControl"></app-checkbox>
    <div class="user-info">
      <app-avatar
        [src]="user.avatar"></app-avatar>
      <div class="name-email">
        <span class="name">{{user.name}}</span>
        <span class="email">{{user.email}}</span>
      </div>
    </div>
    <div class="permission">
      <app-tag
        [title]="formattedRole"
        [theme]="roleTagColor">
      </app-tag>
    </div>
    <div class="actions">
      <button app-action-icon
        [iconName]="'pencil'"
        [title]="'Edit'">
      </button>
      <button app-action-icon
        [iconName]="'trash'">
      </button>
    </div>
  `,
  styleUrls: ['./user-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListItemComponent extends Destroyable implements OnInit {
  @HostBinding('class') get class() {
    return this.userSelectedControl.value ? 'checked' : '';
  }
  @Input() user: User;
  
  userSelectedControl = new FormControl(false);
  formattedRole: string;
  roleTagColor: TagColor;

  constructor(private userStoreFacade: UserStoreFacade) {
    super();
  }

  ngOnInit() {
    this.formattedRole = formatRole(this.user?.role);
    this.roleTagColor = roleTagColorMap[this.user.role];

    this.userSelectedControl.valueChanges.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(value => {
      value ?
        this.userStoreFacade.dispatch.userSelected(this.user) :
        this.userStoreFacade.dispatch.userDeselected(this.user);
    });

    this.userStoreFacade.select.isUserSelected(this.user.id).pipe(
      takeUntil(this.destroyed$)
    ).subscribe(isSelected => {
      this.userSelectedControl.setValue(isSelected, { emitEvent: false });
    })
  }
}