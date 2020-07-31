import { Component } from "@angular/core";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { Store } from "@ngxs/store";
import { ActivatedRoute } from "@angular/router";
import { ConcernState } from "../state/concern.state";
import { IConcernSummary } from "../concern.interfaces";
import { SetSelectedConcern } from "../state/concern.actions";
import { defaultConcern } from "../constants";

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
  constructor(private store: Store, private activatedRoute: ActivatedRoute) {
    const concernId = this.activatedRoute.snapshot.params.concernId;
    if (concernId) {
      const selectedConcern = this.store
        .selectSnapshot(ConcernState)
        .history.find(
          (concern: IConcernSummary) => concern.concernId === concernId
        );
      // if theres no editable concern create default? TODO: decide
      this.store.dispatch(new SetSelectedConcern(selectedConcern));
    } else {
      this.store.dispatch(new SetSelectedConcern(defaultConcern));
    }
  }
}
