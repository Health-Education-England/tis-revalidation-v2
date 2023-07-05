import { Component, Input } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { FormControlBase } from "../form-contol-base.model";

@Component({
  selector: "app-material-selection-list",
  templateUrl: "./material-selection-list.component.html"
})
export class MaterialSelectionListComponent {
  @Input() controlProperties!: FormControlBase;
  @Input() form!: UntypedFormGroup;
}
