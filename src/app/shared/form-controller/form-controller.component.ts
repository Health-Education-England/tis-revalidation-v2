import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ControlBase } from "../form-controls/contol-base.model";

@Component({
  selector: "app-form-controller",
  templateUrl: "./form-controller.component.html",
  styleUrls: ["./form-controller.component.scss"]
})
export class FormControllerComponent implements OnInit {
  constructor() {}

  @Input() control!: ControlBase;
  @Input() form!: FormGroup;

  ngOnInit(): void {
    console.log(this.control);
  }
}
