import { Component, ChangeDetectionStrategy, Input } from "@angular/core";

@Component({
  selector: 'app-checkbox',
  template: `
    <input type="checkbox" class="checkbox" [(ngModel)]="checked" />
  `,
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckBoxComponent {
  @Input() checked: boolean = false;
}