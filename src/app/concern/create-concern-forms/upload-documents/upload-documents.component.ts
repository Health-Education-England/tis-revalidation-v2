import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  ViewChild
} from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { MatStepper } from "@angular/material/stepper";
import { Select, Store } from "@ngxs/store";
import { Observable, Subscription, of } from "rxjs";
import { filter, catchError, finalize, delay } from "rxjs/operators";
import { CommentsComponent } from "src/app/details/comments/comments.component";
import { SnackBarService } from "../../../shared/services/snack-bar/snack-bar.service";
import { IConcernSummary, IFileUploadProgress } from "../../concern.interfaces";
import { Save, SetSelectedConcern } from "../../state/concern.actions";
import { ConcernState } from "../../state/concern.state";
import { StepperSelectionEvent } from "@angular/cdk/stepper";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-upload-documents",
  templateUrl: "./upload-documents.component.html"
})
export class UploadDocumentsComponent implements OnDestroy, AfterViewInit {
  @Input() stepper: MatStepper;
  formGroup: UntypedFormGroup = new UntypedFormGroup({});
  subsciptions: Subscription[] = [];
  @ViewChild(CommentsComponent) appComments: CommentsComponent;
  @Select(ConcernState.selected)
  selectedConcern$: Observable<IConcernSummary>;
  @Select(ConcernState.uploadFileInProgress) filesInProgress: Observable<
    boolean
  >;
  concern: IConcernSummary;

  constructor(
    private snackBarService: SnackBarService,
    private store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    this.initialiseCommentsControl();
    this.setUpStepperListener();
    if (this.addConcernMode) {
      this.checkForFileInPregress();
    }
  }

  ngOnDestroy(): void {
    this.subsciptions.forEach((subscribed: Subscription) => {
      if (subscribed.closed === false) {
        subscribed.unsubscribe();
      }
    });
  }

  public get addConcernMode(): boolean {
    return !!this.activatedRoute.snapshot.params.concerdId;
  }

  private initialiseCommentsControl(): void {
    this.subsciptions.push(
      this.selectedConcern$
        .pipe(filter(Boolean))
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
      ...{ comments: concernComments },
      ...{ lastUpdatedDate: new Date() }
    };
    return this.store.dispatch(new SetSelectedConcern(newConcern));
  }

  private redirectToSummary(): void {
    this.router.navigate(["../"], { relativeTo: this.activatedRoute });
  }

  private get concernFormsAllValid(): boolean {
    const stepsValid: boolean[] = [];
    if (this.stepper) {
      this.stepper.steps.forEach((stepItem) => {
        stepsValid.push(stepItem.stepControl.valid);
      });
    }
    return !stepsValid.includes(false);
  }

  /**
   * subscribe to upload in progress only in add mode where there's a concernId
   */
  private checkForFileInPregress(): void {
    this.subsciptions.push(
      this.filesInProgress
        .pipe(
          filter((val: boolean) => val === false),
          delay(500),
          finalize(() => {
            this.redirectToSummary();
          })
        )
        .subscribe()
    );
  }

  private checkForFileUpload(): void {
    const fp = this.store.selectSnapshot(ConcernState.uploadFileInProgress);
    if (!!fp) {
      this.redirectToSummary();
    } else {
      // TODO: test edge case file(s) are still uplading and save has been clicked
      this.checkForFileInPregress();
    }
  }

  public saveConcern(): void {
    this.patchComments().subscribe(() => {
      if (this.concernFormsAllValid) {
        this.store
          .dispatch(new Save())
          .pipe(
            delay(500),
            finalize(() => this.checkForFileUpload())
          )
          .subscribe();
      } else {
        this.snackBarService.openSnackBar("Please ensure all steps are valid.");
      }
    });
  }
}
