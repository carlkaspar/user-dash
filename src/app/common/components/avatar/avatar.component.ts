import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from "@angular/core";

@Component({
  selector: 'app-avatar',
  template: `
    <img *ngIf="!loaded" [src]="'assets/images/brand.png'" class="avatar-image">
    <img [ngClass]="{'hidden': !loaded}" [src]="src"  class="avatar-image" (load)="onLoaded()">
  `,
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent {
  @Input() src: string;
  loaded = false;

  constructor(private cd: ChangeDetectorRef) {}

  onLoaded() {
    this.loaded = true;
    this.cd.detectChanges();
  }
}