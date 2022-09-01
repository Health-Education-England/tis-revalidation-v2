import { Component, OnInit, Input, ChangeDetectorRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ControlBase } from "../contol-base.model";

@Component({
  selector: "app-material-selection-list",
  templateUrl: "./material-selection-list.component.html",
  styleUrls: ["./material-selection-list.component.scss"]
})
export class MaterialSelectionListComponent implements OnInit {
  @Input() meta!: ControlBase;
  @Input() form!: FormGroup;
  constructor() {}

  ngOnInit(): void {}
}
