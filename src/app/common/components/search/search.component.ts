import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: 'app-search',
  template: `
    <svg-icon-sprite class="search-icon" [src]="searchIconPath"></svg-icon-sprite>
    <input class="search-input" placeholder="Search">
  `,
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
  readonly searchIconPath = 'assets/sprites/sprite.svg#search';
}