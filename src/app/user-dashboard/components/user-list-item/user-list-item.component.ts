import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from "@angular/core";
import {User} from "src/app/common/models/user.model";
import {TagColor} from "src/app/common/types/tag-color.type";
import {formatRole, roleTagColorMap} from "src/app/common/utils/role.util";

@Component({
  selector: 'app-user-list-item',
  template: `
    <app-checkbox [(ngModel)]="checked"></app-checkbox>
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
export class UserListItemComponent implements OnInit {
  @HostBinding('class') get class() {
    return this.checked ? 'checked' : '';
  }
  @Input() user: User;
  checked: boolean = false;

  formattedRole: string;
  roleTagColor: TagColor;

  ngOnInit() {
    this.formattedRole = formatRole(this.user?.role);
    this.roleTagColor = roleTagColorMap[this.user.role];
  }
}