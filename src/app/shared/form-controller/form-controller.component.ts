import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormControlBase } from "../form-controls/form-contol-base.model";

@Component({
  selector: "app-form-controller",
  templateUrl: "./form-controller.component.html"
})
export class FormControllerComponent implements OnInit {
  constructor() {}

  @Input() control!: FormControlBase;
  @Input() form!: FormGroup;

  ngOnInit(): void {}
}
