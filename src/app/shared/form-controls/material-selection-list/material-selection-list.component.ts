import { Component, EventEmitter, Input, Output } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { FormControlBase } from "../form-contol-base.model";
import { MatOption } from "@angular/material/core";

@Component({
  selector: "app-material-selection-list",
  templateUrl: "./material-selection-list.component.html"
})
export class MaterialSelectionListComponent {
  @Input() controlProperties!: FormControlBase;
  @Input() form!: UntypedFormGroup;
  @Output() changed = new EventEmitter<void>();

  onChange() {
    this.changed.emit();
  }
}
