import { Component } from "@angular/core";

@Component({
  selector: "app-create-concern",
  templateUrl: "./create-concern.component.html"
})
export class CreateConcernComponent {
  // TODO cater for edit mode
  public editMode: boolean;
}
