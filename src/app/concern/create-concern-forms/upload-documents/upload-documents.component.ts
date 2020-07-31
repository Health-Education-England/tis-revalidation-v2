import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { MatStepper } from "@angular/material/stepper";
import { StepperSelectionEvent } from "@angular/cdk/stepper";
import { CommentsService } from "src/app/details/comments-tool-bar/comments.service";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-upload-documents",
  templateUrl: "./upload-documents.component.html",
  styleUrls: ["./upload-documents.component.scss"]
})
export class UploadDocumentsComponent implements OnInit, OnDestroy {
  @Input() stepper: MatStepper;
  formGroup: FormGroup = new FormGroup({});

  constructor(private commentsService: CommentsService) {}
  ngOnDestroy(): void {
    this.commentsService.showToolBar$.next(false);
  }

  ngOnInit(): void {
    this.initialiseToolBarSettings();
  }

  /**
   * show hide toolbar based on stepped selection
   */
  initialiseToolBarSettings() {
    this.stepper.selectionChange.subscribe(
      (stepEvent: StepperSelectionEvent) => {
        if (stepEvent.selectedStep.stepControl === this.formGroup) {
          this.commentsService.showToolBar$.next(true);
        } else {
          this.commentsService.showToolBar$.next(false);
        }
      }
    );
  }

  saveConcern(): void {}
}
