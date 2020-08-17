import { StepperSelectionEvent } from "@angular/cdk/stepper";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatStepper } from "@angular/material/stepper";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { Subscription } from "rxjs";
import { take } from "rxjs/operators";
import { CommentsService } from "src/app/details/comments-tool-bar/comments.service";
import { SnackBarService } from "../../../shared/services/snack-bar/snack-bar.service";
import { ConcernService } from "../../services/concern/concern.service";
import { Save } from "../../state/concern.actions";

@Component({
  selector: "app-upload-documents",
  templateUrl: "./upload-documents.component.html"
})
export class UploadDocumentsComponent implements OnInit, OnDestroy {
  @Input() stepper: MatStepper;
  formGroup: FormGroup = new FormGroup({});
  subsciptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private commentsService: CommentsService,
    private concernService: ConcernService,
    private router: Router,
    private snackBarService: SnackBarService,
    private store: Store
  ) {}

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

  public saveConcern(): void {
    const isConcernDetailFormValid: boolean = this.concernService.isConcernDetailFormValid.getValue();
    const isTraineeDetailFormValid: boolean = this.concernService.isTraineeDetailFormValid.getValue();

    if (isConcernDetailFormValid && isTraineeDetailFormValid) {
      this.store
        .dispatch(new Save())
        .pipe(take(1))
        .subscribe(() => {
          this.router.navigate(["../"], { relativeTo: this.activatedRoute });
        });
    } else {
      this.snackBarService.openSnackBar("Please ensure all steps are valid.");
    }
  }
}
