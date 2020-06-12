import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  OnDestroy
} from "@angular/core";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import {
  IRecommendationHistory,
  IRecommendationSummary,
  RecommendationType,
  INote,
  DeferralReason,
  RecommendationStatus
} from "../recommendation-history.interface";
import {
  RecommendationHistoryState,
  defaultRecommendation
} from "../state/recommendation-history.state";
import { Select, Store } from "@ngxs/store";
import { Observable, Subscription, of } from "rxjs";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import {
  map,
  shareReplay,
  catchError,
  tap,
  delay,
  distinctUntilChanged
} from "rxjs/operators";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { MatHorizontalStepper } from "@angular/material/stepper";
import { RecommendationNotesState } from "../state/recommendation-notes.state";
import { environment } from "@environment";
import { Set, Get, Post } from "../state/recommendation-history.actions";
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar
} from "@angular/material/snack-bar";
import { RecommendationNotesComponent } from "../recommendation-notes/recommendation-notes.component";

@Component({
  selector: "app-recommendation-history",
  templateUrl: "./recommendation-history.component.html",
  styleUrls: ["./recommendation-history.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class RecommendationHistoryComponent implements OnInit, OnDestroy {
  @Select(RecommendationHistoryState.recommendationHistory)
  recommendationHistory$: Observable<IRecommendationHistory>;

  @Select(RecommendationNotesState.recommendationNotes)
  recommendationNotes$: Observable<INote[]>;

  @Select(RecommendationHistoryState.currentRecommendation)
  recommendation$: Observable<IRecommendationSummary>;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  @ViewChild("stepper") stepper: MatHorizontalStepper;

  recommendationForm: FormGroup;
  confirmationForm: FormGroup;
  action: FormControl;
  deferralDate: FormControl;
  deferralReason: FormControl;
  deferralSubReason: FormControl;
  allComments: FormControl;
  comments: FormArray;
  componentSubscriptions: Subscription[] = [];
  recommendation: IRecommendationSummary;
  recommendationType = RecommendationType;
  minReferralDate: Date;
  maxReferralDate: Date;
  dateFormat = environment.dateFormat;
  deferralReasons: DeferralReason[] = [];
  deferralSubReasons: DeferralReason[] = [];
  recommendationStatus = RecommendationStatus;
  @Select(RecommendationHistoryState.enableRecommendation)
  enableRecommendation$: Observable<boolean>;
  @Select(RecommendationHistoryState.editRecommendation)
  editRecommendation$: Observable<boolean>;
  deferSelected: boolean;
  gmcNumber: number;

  constructor(
    private bottomSheet: MatBottomSheet,
    private breakpointObserver: BreakpointObserver,
    private store: Store,
    private _snackBar: MatSnackBar
  ) {
    // initialize functions and variables
    this.componentSubscriptions.push(
      this.recommendationHistory$
        .pipe(
          tap((res: IRecommendationHistory) => {
            if (res) {
              this.deferralReasons = res.deferralReasons;
              this.gmcNumber = res.gmcNumber;
            }
          })
        )
        .subscribe()
    );

    this.componentSubscriptions.push(
      this.recommendation$
        .pipe(
          tap((res: IRecommendationSummary) => {
            this.recommendation = res
              ? Object.assign({}, res)
              : Object.assign({}, defaultRecommendation);
            this.bindFormControl();
          })
        )
        .subscribe()
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.componentSubscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  saveDraft(submit?: boolean): void {
    if (this.recommendationForm.valid) {
      // map form data
      const formValue = this.recommendationForm.value;
      this.recommendation.recommendationType = formValue.action;
      this.recommendation.comments = formValue.comments
        .filter((comments: { comment: string; checkbox: boolean }) => {
          return !!comments.comment.trim();
        })
        .map((comments: { comment: string; checkbox: boolean }) => {
          return comments.comment;
        });
      this.recommendation.deferralDate = formValue.deferralDate;
      this.recommendation.deferralReason = formValue.deferralReason;
      this.recommendation.deferralSubReason = formValue.deferralSubReason;
      this.recommendation.gmcNumber = this.gmcNumber;

      // set success snackbar message
      const successMessage = submit
        ? "your recommendation was successfully submitted to GMC"
        : "your recommendation was successfully saved";

      const errorFnc = (err: any) => {
        this.openSnackBar(`An error occurred! please retry`);
        return of(err);
      };

      const successResponse = (res: any) => {
        this.openSnackBar(successMessage);
        this.resetMatStepper();
        return of(res);
      };
      // dispatch save and rebind data
      // if submit to gmc flag dispatch submit functionality
      this.store
        .dispatch(new Set(this.recommendation))
        .pipe(successResponse, catchError(errorFnc))
        .pipe(delay(200))
        .subscribe(() => {
          this.store
            .dispatch(new Get(this.recommendation.gmcNumber))
            .pipe(delay(submit ? 200 : 0))
            .subscribe(() => {
              if (submit) {
                this.store
                  .dispatch(
                    new Post(
                      this.recommendation.gmcNumber,
                      this.recommendation.recommendationId
                    )
                  )
                  .pipe(delay(200))
                  .subscribe(() => {
                    this.store.dispatch(new Get(this.recommendation.gmcNumber));
                  });
              }
            });
        });
    }
  }

  resetMatStepper(): void {
    this.stepper.reset();
    this.recommendationForm.reset();
    this.confirmationForm.reset();
    this.bindFormControl();
  }

  openNotes(): void {
    this.bottomSheet.open(RecommendationNotesComponent);
  }

  submitToGMC(): void {
    this.saveDraft(true);
  }

  addCommentControl(commentText?: string): void {
    const commentControl = new FormGroup({
      comment: new FormControl(commentText ? commentText : ""),
      checkbox: new FormControl(false)
    });
    this.comments.push(commentControl);
  }

  /**
   * filters checkbox FormControls marked for deletion
   * deletes appropriate controls
   */
  deleteCommentControl(): void {
    const filter = (commentControl: FormGroup) => {
      const checkbox = commentControl.controls.checkbox;
      return checkbox.value === true;
    };
    const filteredControls = this.comments.controls.filter(filter);
    const allSelected: boolean =
      filteredControls.length === this.comments.controls.length;
    filteredControls.forEach(() => {
      this.comments.removeAt(this.comments.controls.findIndex(filter));
    });
    if (allSelected) {
      this.allComments.patchValue(false, { onlySelf: true, emitEvent: false });
    }
  }

  /**
   * submission date + 60 days < new deferral date < submission date + 365 days
   */
  private setMinMaxDeferralDates(): void {
    const dateReference = (): Date => {
      return this.recommendation.gmcSubmissionDate
        ? new Date(this.recommendation.gmcSubmissionDate)
        : new Date();
    };
    this.minReferralDate = new Date(
      dateReference().setDate(dateReference().getDate() + 60)
    );
    this.maxReferralDate = new Date(
      dateReference().setFullYear(dateReference().getFullYear() + 1)
    );
  }

  private bindFormControl(): void {
    this.confirmationForm = new FormGroup({
      confirm: new FormControl(false, Validators.requiredTrue)
    });
    this.recommendationForm = new FormGroup({});
    this.setMinMaxDeferralDates();
    this.createVariableControls();
    this.createCommentControls();
    this.createAllCommentsControl();
    this.subscribeToActions();
  }

  /**
   * creates deferralReason, deferralSubReason and deferralDate controls
   * bind show sub reasons based on reason data selected
   */
  private createVariableControls(): void {
    this.deferralReason = new FormControl(
      this.recommendation.deferralReason,
      Validators.required
    );

    this.deferralSubReason = new FormControl(
      this.recommendation.deferralSubReason,
      Validators.required
    );

    this.deferralDate = new FormControl(
      this.recommendation.deferralDate,
      Validators.required
    );

    const setDeferralSubReasons = (val: number) => {
      const selectedReason = this.deferralReasons.find(
        (reason: DeferralReason) => {
          return reason.code === val;
        }
      );

      this.deferralSubReasons = selectedReason?.subReasons
        ? selectedReason.subReasons
        : [];
    };

    this.componentSubscriptions.push(
      this.deferralReason.valueChanges
        .pipe(distinctUntilChanged())
        .subscribe((val) => {
          setDeferralSubReasons(val);

          if (this.deferralSubReasons.length > 0) {
            this.deferralSubReason.setValidators(Validators.required);
          } else {
            this.deferralSubReason.clearValidators();
          }
          // update validity
          this.deferralSubReason.updateValueAndValidity();
          this.deferralSubReason.reset();
        })
    );

    this.recommendationForm.addControl("deferralReason", this.deferralReason);
    this.recommendationForm.addControl(
      "deferralSubReason",
      this.deferralSubReason
    );
    this.recommendationForm.addControl("deferralDate", this.deferralDate);
    // if rebind sub reasons mat-select control
    if (
      this.recommendation.recommendationId &&
      this.recommendation.deferralSubReason
    ) {
      this.deferralReason.updateValueAndValidity();
      this.deferralSubReason.setValue(this.recommendation.deferralSubReason);
    }
  }

  /**
   * creates a comments FormGroup for each comment
   * adds an empty comment FormGroup for readily adding comment
   */
  private createCommentControls(): void {
    this.comments = new FormArray([]);
    if (this.recommendation.comments) {
      for (const comment of this.recommendation.comments) {
        this.addCommentControl(comment);
      }
    }
    this.addCommentControl();
    this.recommendationForm.addControl("comments", this.comments);
  }

  /**
   * Creates all comments checkbox
   * ticks and un-ticks checkboxes besides individual comments for delete functionality
   */
  private createAllCommentsControl(): void {
    this.allComments = new FormControl({
      value: false,
      disabled: true
    });
    this.recommendationForm.addControl("allComments", this.allComments);
    this.componentSubscriptions.push(
      this.allComments.valueChanges.subscribe((val) => {
        this.comments.controls.forEach((commentControl: FormGroup) => {
          const checkbox = commentControl.controls.checkbox;
          checkbox.setValue(val);
        });
      })
    );
  }

  /**
   * build recommendation action formControl
   * add subscription of action control to subscription array
   * when defer, set required validators for deferral date, reason and sub-reason formControls
   * enable disable all comments tick box in tool-bar // TODO: revise with users
   */
  private subscribeToActions(): void {
    this.action = new FormControl(
      this.recommendation.recommendationType,
      Validators.required
    );
    this.componentSubscriptions.push(
      this.action.valueChanges.subscribe((val) => {
        this.deferSelected =
          this.recommendationType[val] === this.recommendationType.DEFER;
        if (this.deferSelected) {
          this.deferralReason.setValidators(Validators.required);
          this.deferralSubReason.setValidators(Validators.required);
          this.deferralDate.setValidators(Validators.required);
        } else {
          this.deferralReason.clearValidators();
          this.deferralSubReason.clearValidators();
          this.deferralDate.clearValidators();
          this.deferralReason.reset();
          this.deferralSubReason.reset();
          this.deferralDate.reset();
        }
        this.deferralReason.updateValueAndValidity();
        this.deferralDate.updateValueAndValidity();
        this.deferralSubReason.updateValueAndValidity();

        const opts = { onlySelf: true, emitEvent: false };
        if (val) {
          this.allComments.enable(opts);
        } else {
          this.allComments.disable(opts);
        }
      })
    );
    // validate when form is edit mode
    if (this.recommendation.recommendationId) {
      this.action.updateValueAndValidity();
    }
    this.recommendationForm.addControl("action", this.action);
  }

  private openSnackBar(message: string): MatSnackBarRef<SimpleSnackBar> {
    return this._snackBar.open(message, "Close", {
      duration: 5000
    });
  }
}
