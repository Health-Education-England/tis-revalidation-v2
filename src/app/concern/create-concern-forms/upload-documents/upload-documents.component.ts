import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { MatStepper } from "@angular/material/stepper";
import { StepperSelectionEvent } from "@angular/cdk/stepper";
import { CommentsService } from "src/app/details/comments-tool-bar/comments.service";
import { FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-upload-documents",
  templateUrl: "./upload-documents.component.html"
})
export class UploadDocumentsComponent implements OnInit, OnDestroy {
  @Input() stepper: MatStepper;
  formGroup: FormGroup = new FormGroup({});
  subsciptions: Subscription[] = [];

  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {
    this.initialiseToolBarSettings();
  }

  ngOnDestroy(): void {
    this.commentsService.showToolBar$.next(false);
    this.subsciptions.forEach((subscribed: Subscription) => {
      if (subscribed.closed === false) {
        subscribed.unsubscribe();
      }
    });
  }

  /**
   * show hide toolbar based on stepped selection
   */
  initialiseToolBarSettings() {
    if (this.stepper) {
      this.subsciptions.push(
        this.stepper.selectionChange.subscribe(
          (stepEvent: StepperSelectionEvent) => {
            if (stepEvent.selectedStep.stepControl === this.formGroup) {
              this.commentsService.showToolBar$.next(true);
            } else {
              this.commentsService.showToolBar$.next(false);
            }
          }
        )
      );
    }
  }

  saveConcern(): void {}
}
