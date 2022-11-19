import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: 'app-avatar',
  template: `
    <img [src]="src" (error)="setAlternativeImage()" class="avatar-image">
  `,
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent {
  @Input() src: string;

  setAlternativeImage() {
    this.src = 'assets/images/brand.png';
  }
}