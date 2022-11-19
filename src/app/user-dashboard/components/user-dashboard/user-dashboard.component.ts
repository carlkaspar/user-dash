import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: 'app-user-dashboard',
  template: `
    <div class="dashboard-header">
      <h2 class="title">Account users</h2>
      <div class="header-right">
        <app-search></app-search>
        <button app-button-primary>Connect users</button>
      </div>
    </div>
    <app-user-list></app-user-list>
  `,
  styleUrls: ['./user-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDashboardComponent {}