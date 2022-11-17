import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: 'button[app-action-icon]',
  template: `
    <div class="icon-container">
      <svg-icon-sprite [src]="iconPath"></svg-icon-sprite>
    </div>
    <span *ngIf="title" class="icon-title">{{title}}</span>
  `,
  styleUrls: ['./action-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionIconComponent {
  @Input() iconName: 'trash' | 'pencil';
  @Input() title: string;

  get iconPath() {
    return `assets/sprites/sprite.svg#${this.iconName}`
  }
}