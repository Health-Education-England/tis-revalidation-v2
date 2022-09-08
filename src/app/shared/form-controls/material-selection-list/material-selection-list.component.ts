import { Component, OnInit, Input, ChangeDetectorRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormControlBase } from "../form-contol-base.model";

@Component({
  selector: "app-material-selection-list",
  templateUrl: "./material-selection-list.component.html"
})
export class MaterialSelectionListComponent implements OnInit {
  @Input() meta!: FormControlBase;
  @Input() form!: FormGroup;
  constructor() {}

  ngOnInit(): void {}
}
