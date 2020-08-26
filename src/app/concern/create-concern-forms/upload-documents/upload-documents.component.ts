import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  ViewChild
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatStepper } from "@angular/material/stepper";
import { Select, Store } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { CommentsComponent } from "src/app/details/comments/comments.component";
import { SnackBarService } from "../../../shared/services/snack-bar/snack-bar.service";
import { IConcernSummary } from "../../concern.interfaces";
import { ConcernService } from "../../services/concern/concern.service";
import { Save, SetSelectedConcern } from "../../state/concern.actions";
import { ConcernState } from "../../state/concern.state";
import { StepperSelectionEvent } from "@angular/cdk/stepper";

@Component({
  selector: "app-upload-documents",
  templateUrl: "./upload-documents.component.html"
})
export class UploadDocumentsComponent implements OnDestroy, AfterViewInit {
  @Input() stepper: MatStepper;
  formGroup: FormGroup = new FormGroup({});
  subsciptions: Subscription[] = [];
  @ViewChild(CommentsComponent) appComments: CommentsComponent;
  @Select(ConcernState.selected)
  selectedConcern$: Observable<IConcernSummary>;
  concern: IConcernSummary;

  constructor(private snackBarService: SnackBarService, private store: Store) {}

  ngAfterViewInit(): void {
    this.initialiseCommentsControl();
    this.setUpStepperListener();
  }

  ngOnDestroy(): void {
    this.subsciptions.forEach((subscribed: Subscription) => {
      if (subscribed.closed === false) {
        subscribed.unsubscribe();
      }
    });
  }

  private initialiseCommentsControl(): void {
    this.subsciptions.push(
      this.selectedConcern$
        .pipe(
          filter(
            (concern: IConcernSummary) =>
              JSON.stringify(concern.comments) !==
              JSON.stringify(this.appComments.featureComments)
          )
        )
        .subscribe((concern: IConcernSummary) => {
          this.concern = concern;
          this.appComments.featureComments = this.concern.comments;
        })
    );
  }

  private setUpStepperListener(): void {
    if (this.stepper) {
      this.subsciptions.push(
        this.stepper.selectionChange.subscribe(
          (step: StepperSelectionEvent) => {
            if (step.previouslySelectedStep.stepControl === this.formGroup) {
              this.patchComments();
            }
          }
        )
      );
    }
  }

  private patchComments(): Observable<any> {
    const concernComments: string[] = this.appComments.comments.value
      .filter((comments: { comment: string; checkbox: boolean }) => {
        return !!comments.comment.trim();
      })
      .map((comments: { comment: string; checkbox: boolean }) => {
        return comments.comment;
      });
    const newConcern = {
      ...this.concern,
      ...{ comments: concernComments }
    };
    return this.store.dispatch(new SetSelectedConcern(newConcern));
  }

  public saveConcern(): void {
    const stepsValid: boolean[] = [];
    this.stepper.steps.forEach((stepItem) => {
      stepsValid.push(stepItem.stepControl.valid);
    });
    this.patchComments().subscribe(() => {
      if (!stepsValid.includes(false)) {
        this.store.dispatch(new Save());
      } else {
        this.snackBarService.openSnackBar("Please ensure all steps are valid.");
      }
    });
  }
}
