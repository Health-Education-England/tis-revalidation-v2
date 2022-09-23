import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormControlBase } from "../form-contol-base.model";

@Component({
  selector: "app-material-selection-list",
  templateUrl: "./material-selection-list.component.html"
})
export class MaterialSelectionListComponent {
  @Input() controlProperties!: FormControlBase;
  @Input() form!: FormGroup;
}
