import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  OnDestroy
} from "@angular/core";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { RevalidationNotesComponent } from "../revalidation-notes/revalidation-notes.component";
import {
  IRevalidationHistory,
  IRevalidation,
  RecommendationType,
  INote,
  DeferralReason,
  RecommendationStatus
} from "../revalidation-history.interface";
import {
  RevalidationHistoryState,
  defaultRecommendation
} from "../state/revalidation-history.state";
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
import { RevalidationNotesState } from "../state/revalidation-notes.state";
import { environment } from "@environment";
import {
  SaveRevalidationHistory,
  RevalidationHistoryAction,
  SubmitRevalidationHistoryToGMC
} from "../state/revalidation-history.actions";
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar
} from "@angular/material/snack-bar";

@Component({
  selector: "app-revalidation-history",
  templateUrl: "./revalidation-history.component.html",
  styleUrls: ["./revalidation-history.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class RevalidationHistoryComponent implements OnInit, OnDestroy {
  @Select(RevalidationHistoryState.revalidationHistory)
  revalidationHistory$: Observable<IRevalidationHistory>;

  @Select(RevalidationNotesState.revalidationNotes)
  revalidationNotes$: Observable<INote[]>;

  @Select(RevalidationHistoryState.currentRecommendation)
  revalidation$: Observable<IRevalidation>;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  @ViewChild("stepper") stepper: MatHorizontalStepper;

  revalidationForm: FormGroup;
  confirmationForm: FormGroup;
  action: FormControl;
  deferralDate: FormControl;
  deferralReason: FormControl;
  deferralSubReason: FormControl;
  allComments: FormControl;
  comments: FormArray;
  componentSubscriptions: Subscription[] = [];
  revalidation: IRevalidation;
  recommendationType = RecommendationType;
  minReferralDate: Date;
  maxReferralDate: Date;
  dateFormat = environment.dateFormat;
  deferralReasons: DeferralReason[] = [];
  deferralSubReasons: DeferralReason[] = [];
  recommendationStatus = RecommendationStatus;
  @Select(RevalidationHistoryState.enableRecommendation)
  enableRecommendation$: Observable<boolean>;
  @Select(RevalidationHistoryState.editRecommendation)
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
      this.revalidationHistory$
        .pipe(
          tap((res: IRevalidationHistory) => {
            if (res) {
              this.deferralReasons = res.deferralReasons;
              this.gmcNumber = res.gmcNumber;
            }
          })
        )
        .subscribe()
    );

    this.componentSubscriptions.push(
      this.revalidation$
        .pipe(
          tap((res: IRevalidation) => {
            this.revalidation = res
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
    if (this.revalidationForm.valid) {
      // map form data
      const formValue = this.revalidationForm.value;
      this.revalidation.recommendationType = formValue.action;
      this.revalidation.comments = formValue.comments
        .filter((comments: { comment: string; checkbox: boolean }) => {
          return !!comments.comment.trim();
        })
        .map((comments: { comment: string; checkbox: boolean }) => {
          return comments.comment;
        });
      this.revalidation.deferralDate = formValue.deferralDate;
      this.revalidation.deferralReason = formValue.deferralReason;
      this.revalidation.deferralSubReason = formValue.deferralSubReason;
      this.revalidation.gmcNumber = this.gmcNumber;

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
        .dispatch(new SaveRevalidationHistory(this.revalidation))
        .pipe(successResponse, catchError(errorFnc))
        .pipe(delay(200))
        .subscribe(() => {
          this.store
            .dispatch(
              new RevalidationHistoryAction(this.revalidation.gmcNumber)
            )
            .pipe(delay(submit ? 200 : 0))
            .subscribe(() => {
              if (submit) {
                this.store
                  .dispatch(
                    new SubmitRevalidationHistoryToGMC(
                      this.revalidation.gmcNumber,
                      this.revalidation.recommendationId
                    )
                  )
                  .pipe(delay(200))
                  .subscribe(() => {
                    this.store.dispatch(
                      new RevalidationHistoryAction(this.revalidation.gmcNumber)
                    );
                  });
              }
            });
        });
    }
  }

  resetMatStepper(): void {
    this.stepper.reset();
    this.revalidationForm.reset();
    this.confirmationForm.reset();
    this.bindFormControl();
  }

  openNotes(): void {
    this.bottomSheet.open(RevalidationNotesComponent);
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
      return this.revalidation.gmcSubmissionDate
        ? new Date(this.revalidation.gmcSubmissionDate)
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
    this.revalidationForm = new FormGroup({});
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
      this.revalidation.deferralReason,
      Validators.required
    );

    this.deferralSubReason = new FormControl(
      this.revalidation.deferralSubReason,
      Validators.required
    );

    this.deferralDate = new FormControl(
      this.revalidation.deferralDate,
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

    this.revalidationForm.addControl("deferralReason", this.deferralReason);
    this.revalidationForm.addControl(
      "deferralSubReason",
      this.deferralSubReason
    );
    this.revalidationForm.addControl("deferralDate", this.deferralDate);
    // if rebind sub reasons mat-select control
    if (
      this.revalidation.recommendationId &&
      this.revalidation.deferralSubReason
    ) {
      this.deferralReason.updateValueAndValidity();
      this.deferralSubReason.setValue(this.revalidation.deferralSubReason);
    }
  }

  /**
   * creates a comments FormGroup for each comment
   * adds an empty comment FormGroup for readily adding comment
   */
  private createCommentControls(): void {
    this.comments = new FormArray([]);
    if (this.revalidation.comments) {
      for (const comment of this.revalidation.comments) {
        this.addCommentControl(comment);
      }
    }
    this.addCommentControl();
    this.revalidationForm.addControl("comments", this.comments);
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
    this.revalidationForm.addControl("allComments", this.allComments);
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
      this.revalidation.recommendationType,
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
    if (this.revalidation.recommendationId) {
      this.action.updateValueAndValidity();
    }
    this.revalidationForm.addControl("action", this.action);
  }

  private openSnackBar(message: string): MatSnackBarRef<SimpleSnackBar> {
    return this._snackBar.open(message, "Close", {
      duration: 2000
    });
  }
}
