import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-user-dashboard></app-user-dashboard>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
