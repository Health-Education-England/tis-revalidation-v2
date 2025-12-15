import { Component, HostListener, Input, OnInit } from "@angular/core";
import * as day from "dayjs";
import {
  DateRangeControl,
  OnChangeFn,
  OnTouchFn
} from "../form-contol-base.model";
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR
} from "@angular/forms";

@Component({
  selector: "app-material-date-range-picker",
  templateUrl: "./material-date-range-picker.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: MaterialDateRangePickerComponent
    }
  ]
})
export class MaterialDateRangePickerComponent
  implements OnInit, ControlValueAccessor
{
  constructor(readonly formBuilder: FormBuilder) {}
  dateRangeForm: FormGroup;

  ngOnInit(): void {
    this.dateRangeForm = this.formBuilder.group({
      [this.controlProperties.startRangeControl]: "",
      [this.controlProperties.endRangeControl]: ""
    });
  }

  @Input() controlProperties!: DateRangeControl;

  onDateChange(event: any, control: string) {
    if (event.value) {
      const formatted = day(event.value).format(
        this.controlProperties.outputDateFormat || "YYYY-MM-DD"
      );
      this.dateRangeForm.get(control).setValue(formatted);
      this.onChange(this.dateRangeForm.value);
    }
  }
  disabled = false;

  // ControlValueAccessor
  onChange: OnChangeFn<any> = () => {};
  onTouch: OnTouchFn = () => {};

  writeValue(value: any): void {
    if (value) {
      this.dateRangeForm.setValue(value);
    } else {
      this.dateRangeForm.reset();
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
