import { Component, ChangeDetectionStrategy, Input, HostBinding } from "@angular/core";
import {TagColor} from "../../types/tag-color.type";

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
  @Input() theme: TagColor;
}