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
  DeferralReason
} from "../revalidation-history.interface";
import { RevalidationHistoryState } from "../state/revalidation-history.state";
import { Select } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map, shareReplay } from "rxjs/operators";
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  AbstractControl
} from "@angular/forms";
import { MatHorizontalStepper } from "@angular/material/stepper";
import { RevalidationNotesState } from "../state/revalidation-notes.state";
import { environment } from "@environment";

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
  deferralReasons: DeferralReason[];
  deferralSubReasons: DeferralReason[] = [];

  constructor(
    private bottomSheet: MatBottomSheet,
    private breakpointObserver: BreakpointObserver
  ) {
    this.componentSubscriptions.push(
      this.revalidationHistory$.subscribe((res) => {
        this.revalidation = null;
        // TODO: refactor with new column
        // res.revalidations.find((item: IRevalidation) => {
        //   return item.submissionStatus === "draft";
        // });
        this.deferralReasons = res.deferralReasons;
        this.bindRecommendationData();
        this.bindFormControl();
      })
    );
  }

  ngOnDestroy(): void {
    this.componentSubscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit(): void {}

  saveDraft(): void {
    (window as any).alert("draft saved");
    this.resetMatStepper();
  }

  resetMatStepper(): void {
    this.stepper.reset();
    this.revalidationForm.reset();
    this.confirmationForm.reset();
    this.bindRecommendationData();
    this.bindFormControl();
  }

  openNotes(): void {
    this.bottomSheet.open(RevalidationNotesComponent);
  }

  submitToGMC(): void {
    // TODO: cast recommendationType to Enum Key
    (window as any).alert("Submitted to GMC");
    this.resetMatStepper();
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
    const filter = (commentControl: FormGroup, index: number) => {
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

  private bindRecommendationData(): void {
    if (!this.revalidation) {
      this.revalidation = {
        actualSubmissionDate: null,
        admin: null,
        deferralComment: null,
        deferralDate: null,
        deferralReason: null,
        gmcOutcome: null,
        gmcRevalidationId: null,
        gmcSubmissionDate: null,
        revalidationStatus: null,
        recommendationType: null,
        comments: [],
        deferralSubReason: null,
        gmcNumber: null,
        recommendationId: null
      };
    }
  }

  private bindFormControl(): void {
    this.confirmationForm = new FormGroup({
      confirm: new FormControl(false, Validators.requiredTrue)
    });
    this.revalidationForm = new FormGroup({});
    this.setMinMaxDeferralDates();
    this.createVariableControls();
    this.createCommentControls();
    this.subscribeToActions();
    this.createAllCommentsControl();
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

    this.componentSubscriptions.push(
      this.deferralReason.valueChanges.subscribe((val) => {
        const selectedReason = this.deferralReasons.find(
          (reason: DeferralReason) => {
            return reason.code === val;
          }
        );

        this.deferralSubReasons = selectedReason?.subReasons
          ? selectedReason.subReasons
          : [];

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
    this.revalidationForm.addControl("action", this.action);

    this.componentSubscriptions.push(
      this.action.valueChanges.subscribe((val) => {
        if (val === this.recommendationType.DEFER) {
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
  }
}
