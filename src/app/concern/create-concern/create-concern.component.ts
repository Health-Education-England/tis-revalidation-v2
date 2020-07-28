import { Component } from "@angular/core";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";

@Component({
  selector: "app-create-concern",
  templateUrl: "./create-concern.component.html",
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    }
  ]
})
export class CreateConcernComponent {
  // TODO cater for edit mode
  public editMode: boolean;
}
