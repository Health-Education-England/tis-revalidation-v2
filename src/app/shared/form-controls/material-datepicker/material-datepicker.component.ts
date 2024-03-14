import { Component, Input } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { FormControlBase } from "../form-contol-base.model";

@Component({
  selector: "app-material-datepicker",
  templateUrl: "./material-datepicker.component.html",
  styleUrls: ["./material-datepicker.component.scss"]
})
export class MaterialDatepickerComponent {
  @Input() controlProperties!: FormControlBase;
  @Input() form!: UntypedFormGroup;
  showClearIcon: boolean = false;
  clearDate() {
    this.form.controls[this.controlProperties.key].setValue("");
  }

  toggleDelete() {
    this.showClearIcon = this.form.controls[this.controlProperties.key].value;
  }
}
