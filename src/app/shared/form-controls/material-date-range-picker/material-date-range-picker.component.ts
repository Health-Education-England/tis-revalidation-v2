import { Component, EventEmitter, Input, Output } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { DatePickerControl } from "../form-contol-base.model";

@Component({
  selector: "app-material-date-range-picker",
  templateUrl: "./material-date-range-picker.component.html",
  styleUrls: ["./material-date-range-picker.component.scss"]
})
export class MaterialDateRangePickerComponent {
  @Input() controlProperties!: DatePickerControl;
  @Input() form!: UntypedFormGroup;
  @Output() changed = new EventEmitter<void>();
  onChange() {
    this.changed.emit();
  }
}
