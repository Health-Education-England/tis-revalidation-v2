import { Component, HostListener, Input } from "@angular/core";
import {
  FormControlBase,
  OnChangeFn,
  OnTouchFn
} from "../form-contol-base.model";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { MatCheckboxChange } from "@angular/material/checkbox";

@Component({
  selector: "app-material-checkbox",
  templateUrl: "./material-checkbox.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: MaterialCheckboxComponent
    }
  ]
})
export class MaterialCheckboxComponent implements ControlValueAccessor {
  @Input() controlProperties!: FormControlBase;

  disabled = false;
  checked: boolean;
  value: string;

  onCheck(matCheckBoxChange: MatCheckboxChange) {
    if (matCheckBoxChange.checked) {
      this.value = this.controlProperties.value;
    } else {
      this.value = "";
    }
    this.onChange(this.value);
  }

  // ControlValueAccessor
  onChange: OnChangeFn<string> = () => {};
  onTouch: OnTouchFn = () => {};

  writeValue(value: string): void {
    if (value) {
      this.checked = true;
    }
  }
  registerOnChange(fn: OnChangeFn<string>): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: OnTouchFn): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  @HostListener("focusout")
  onFocusOut() {
    this.onTouch();
  }
}
