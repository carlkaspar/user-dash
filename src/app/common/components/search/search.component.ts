import { Component, ChangeDetectionStrategy } from "@angular/core";
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {takeUntil} from "rxjs/operators";
import {Destroyable} from "../../utils/destroyable";

@Component({
  selector: 'app-search',
  template: `
    <svg-icon-sprite class="search-icon" [src]="searchIconPath"></svg-icon-sprite>
    <input [formControl]="searchFormControl" (blur)="onTouched") class="search-input" placeholder="Search">
  `,
  styleUrls: ['./search.component.scss'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: SearchComponent,
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent extends Destroyable implements ControlValueAccessor {
  readonly searchIconPath = 'assets/sprites/sprite.svg#search';

  searchFormControl = new FormControl();
  onTouched: () => {};
  
  writeValue(value: string): void {
    this.searchFormControl.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: (value: string) => {}): void {
    this.searchFormControl.valueChanges.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(fn)
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ?
      this.searchFormControl.disable() :
      this.searchFormControl.enable();
  }
}