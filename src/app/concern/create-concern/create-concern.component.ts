import { Component, ViewEncapsulation } from "@angular/core";
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
  styleUrls: ["./create-concern.component.scss"],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class CreateConcernComponent {
  constructor(private store: Store, private activatedRoute: ActivatedRoute) {
    const concernId = this.activatedRoute.snapshot.params.concernId;
    if (concernId) {
      const selectedConcern = this.store
        .selectSnapshot(ConcernState)
        .history.find(
          (concern: IConcernSummary) => concern.concernId === concernId
        );
      if (selectedConcern) {
        this.store.dispatch(new SetSelectedConcern(selectedConcern));
        return;
      }
    }
    this.store
      .dispatch(new SetSelectedConcern(defaultConcern))
      // TODO: *NOTE MUST REMOVE THIS
      .subscribe(() => {
        const selectedConcern = this.store.selectSnapshot(
          ConcernState.selected
        );
        const gmcNumber = this.store.selectSnapshot(ConcernState.gmcNumber);
        this.store.dispatch(
          new SetSelectedConcern({
            ...selectedConcern,
            ...{ concernId: gmcNumber }
          })
        );
      });
    // TODO: *NOTE MUST REMOVE THIS
  }
}
