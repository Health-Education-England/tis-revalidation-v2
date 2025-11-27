import { Component, Input } from "@angular/core";
import { FormControlBase } from "../form-contol-base.model";
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  UntypedFormGroup
} from "@angular/forms";
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

  isChecked: boolean;
  value: string;
  // ControlValueAccessor

  onCheck(matCheckboxChange: MatCheckboxChange) {
    if (matCheckboxChange.checked) {
      this.value = this.controlProperties.value;
    } else {
      this.value = "";
    }
    console.log(this.value);
    this.onChange(this.value);
    //  form
    //     .get(controlProperties.key)
    //     ?.setValue($event.checked ? controlProperties.value : '')
  }
  onChange: OnChangeFn<string> = () => {};
  onTouch: OnTouchFn = () => {};

  writeValue(val: string): void {
    console.log("write");
    if (val) {
      this.isChecked = true;
    }
  }
  registerOnChange(fn: OnChangeFn<string>): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {}
}

type OnChangeFn<T> = (value: T) => void;
type OnTouchFn = () => void;

//form.get(controlProperties.key)?.value === controlProperties.value
