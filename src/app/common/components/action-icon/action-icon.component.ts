import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Renderer2 } from "@angular/core";
import {fromEvent, takeUntil} from "rxjs";
import {Destroyable} from "../../utils/destroyable";

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
export class ActionIconComponent extends Destroyable implements OnInit {
  @Input() iconName: 'trash' | 'pencil';
  @Input() title: string;

  get iconPath() {
    return `assets/sprites/sprite.svg#${this.iconName}`
  }

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
    super();
  }

  ngOnInit(): void {
    if (this.iconName === 'pencil') {
      fromEvent(this.elRef.nativeElement, 'click').pipe(
        takeUntil(this.destroyed$)
      ).subscribe(() => {
        this.renderer.addClass(this.elRef.nativeElement, 'rotate');
        setTimeout(() => {
          this.renderer.removeClass(this.elRef.nativeElement, 'rotate');
        }, 200)
      });
    }
  }
}