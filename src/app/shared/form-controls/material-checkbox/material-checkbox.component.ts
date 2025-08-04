import { Component, Input } from "@angular/core";
import { FormControlBase } from "../form-contol-base.model";
import { UntypedFormGroup } from "@angular/forms";

@Component({
  selector: "app-material-checkbox",
  templateUrl: "./material-checkbox.component.html"
})
export class MaterialCheckboxComponent {
  @Input() controlProperties!: FormControlBase;
  @Input() form!: UntypedFormGroup;
}
