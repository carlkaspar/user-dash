import { Component, ChangeDetectionStrategy, Input, HostBinding } from "@angular/core";

@Component({
  selector: 'app-tag',
  template: `<span>{{title}}</span>`,
  styleUrls: ['./tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagComponent {
  @HostBinding('class') get class() {
    return this.theme;
  }

  @Input() title: string;
  @Input() theme: 'pink' | 'purple' | 'blue' | 'orange';
}