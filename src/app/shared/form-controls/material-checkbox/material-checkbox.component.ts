import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControlBase } from "../form-contol-base.model";
import { UntypedFormGroup } from "@angular/forms";
import { MatCheckbox } from "@angular/material/checkbox";

@Component({
  selector: "app-material-checkbox",
  templateUrl: "./material-checkbox.component.html"
})
export class MaterialCheckboxComponent {
  @Input() controlProperties!: FormControlBase;
  @Input() form!: UntypedFormGroup;
  @Output() changed = new EventEmitter<void>();

  onChange(matCheckBox: MatCheckbox) {
    this.form
      .get(this.controlProperties.key)
      ?.setValue(matCheckBox.checked ? this.controlProperties.value : "");
    this.changed.emit();
  }
}
