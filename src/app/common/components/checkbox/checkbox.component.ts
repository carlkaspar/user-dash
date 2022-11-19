import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {takeUntil} from "rxjs";
import {Destroyable} from "../../utils/destroyable";

@Component({
  selector: 'app-checkbox',
  template: `
    <input
      type="checkbox"
      class="checkbox"
      [formControl]="checkboxControl"
      (blur)="onBlur()"
    />
  `,
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CheckBoxComponent,
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckBoxComponent extends Destroyable implements ControlValueAccessor {
  checkboxControl = new FormControl();

  onBlur: () => {};

  writeValue(value: boolean): void {
    this.checkboxControl.setValue(value, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    this.checkboxControl.valueChanges.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    this.onBlur = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ?
      this.checkboxControl.disable() :
      this.checkboxControl.enable();
  }
}