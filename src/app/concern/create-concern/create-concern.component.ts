import { Component, ViewEncapsulation } from "@angular/core";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";

@Component({
  selector: "app-create-concern",
  templateUrl: "./create-concern.component.html",
  styleUrls: ["./create-concern.component.scss"],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class CreateConcernComponent {}
