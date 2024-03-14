import { Component, Input } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { FormControlBase } from "../form-contol-base.model";

@Component({
  selector: "app-material-radio",
  templateUrl: "./material-radio.component.html",
  styleUrls: ["./material-radio.component.scss"]
})
export class MaterialRadioComponent {
  @Input() controlProperties!: FormControlBase;
  @Input() form!: UntypedFormGroup;
}
