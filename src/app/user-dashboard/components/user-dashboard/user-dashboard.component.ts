import { ChangeDetectionStrategy, Component } from "@angular/core";
import {takeUntil} from "rxjs/operators";
import {Destroyable} from "src/app/common/utils/destroyable";
import {UserStoreFacade} from "../../services/user-store.facade";

@Component({
  selector: 'app-user-dashboard',
  template: `
    <div class="dashboard-header">
      <h2 class="title">Account users</h2>
      <div class="header-right">
        <app-search [(ngModel)]="searchValue"></app-search>
        <button app-button-primary (click)="search()">Connect users</button>
      </div>
    </div>
    <app-user-list></app-user-list>
  `,
  styleUrls: ['./user-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDashboardComponent extends Destroyable {
  searchValue = '';

  constructor(
    private userStateFacade: UserStoreFacade
  ) {
    super();
    this.userStateFacade.select.searchValue().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(value => this.searchValue = value);
  }

  search() {
    this.userStateFacade.dispatch.userSearch(this.searchValue)
  }
}