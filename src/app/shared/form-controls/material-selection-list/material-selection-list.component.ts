import { Component, HostListener, Input } from "@angular/core";
import {
  ControlValueAccessor,
  FormBuilder,
  NG_VALUE_ACCESSOR
} from "@angular/forms";
import {
  FormControlBase,
  OnChangeFn,
  OnTouchFn
} from "../form-contol-base.model";
import { MatSelectionListChange } from "@angular/material/list";

@Component({
  selector: "app-material-selection-list",
  templateUrl: "./material-selection-list.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: MaterialSelectionListComponent
    }
  ]
})
export class MaterialSelectionListComponent implements ControlValueAccessor {
  constructor(readonly formBuilder: FormBuilder) {}

  @Input() controlProperties!: FormControlBase;
  selectionForm = this.formBuilder.group({
    selectionList: ""
  });
  disabled = false;

  onSelectionChange(matSelectionListChange: MatSelectionListChange) {
    this.onChange(this.selectionForm.get("selectionList").value);
  }

  // ControlValueAccessor
  onChange: OnChangeFn<string> = () => {};
  onTouch: OnTouchFn = () => {};

  writeValue(value: any): void {
    this.selectionForm.get("selectionList").setValue(value);
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
