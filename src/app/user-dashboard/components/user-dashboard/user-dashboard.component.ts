import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: 'app-user-dashboard',
  template: `
    <div class="dashboard-header">

    </div>
    <app-user-list></app-user-list>
  `,
  styleUrls: ['./user-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDashboardComponent {}