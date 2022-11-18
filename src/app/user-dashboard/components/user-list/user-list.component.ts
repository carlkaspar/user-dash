import { ChangeDetectionStrategy, Component } from "@angular/core";
import {Observable, of} from "rxjs";
import {User} from "src/app/common/models/user.model";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-list',
  template: `
    <app-user-list-item *ngFor="let user of (users$ | async)"
      [user]="user">
    </app-user-list-item>
  `,
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {
  users$: Observable<User[]> = this.userService.getUsers();

  constructor(private userService: UserService) {}
}