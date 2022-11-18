import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-user-list></app-user-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
