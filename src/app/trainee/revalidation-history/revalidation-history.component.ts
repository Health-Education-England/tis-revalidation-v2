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
  RevalidationType,
  INote
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
  allComments: FormControl;
  comments: FormArray;
  componentSubscriptions: Subscription[] = [];
  revalidation: IRevalidation;
  revalidationType = RevalidationType;
  minReferralDate: Date;
  maxReferralDate: Date;
  dateFormat = environment.dateFormat;

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
    // TODO: cast revalidationType to Enum Key
    (window as any).alert("Submitted to GMC");
    this.resetMatStepper();
  }

  addCommentControl(): void {
    let commentControl = new FormGroup({
      comment: new FormControl(""),
      checkbox: new FormControl(false)
    });
    this.comments.push(commentControl);
  }

  deleteCommentControl(): void {
    const filter = (commentControl: FormGroup, index: number) => {
      const checkbox = commentControl.controls["checkbox"];
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
        revalidationType: null
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

  private createVariableControls(): void {
    this.deferralReason = new FormControl(
      this.revalidation.deferralReason,
      Validators.required
    );
    this.revalidationForm.addControl("deferralReason", this.deferralReason);

    this.deferralDate = new FormControl(
      this.revalidation.deferralDate,
      Validators.required
    );
    this.revalidationForm.addControl("deferralDate", this.deferralDate);
  }

  private createCommentControls(): void {
    this.comments = new FormArray([]);
    // TODO: uncomment when comments array is added to mongo-db
    // if (this.revalidation.comments) {
    //   for (const comment of this.revalidation.comments) {
    //     const commentControl = new FormControl(comment.comment);
    //     this.comments.push(commentControl);
    //   }
    // }
    // else clause
    this.addCommentControl();
    this.revalidationForm.addControl("comments", this.comments);
  }

  private createAllCommentsControl(): void {
    this.allComments = new FormControl({
      value: false,
      disabled: true
    });
    this.revalidationForm.addControl("allComments", this.allComments);
    this.componentSubscriptions.push(
      this.allComments.valueChanges.subscribe((val) => {
        this.comments.controls.forEach((commentControl: FormGroup) => {
          const checkbox = commentControl.controls["checkbox"];
          checkbox.setValue(val);
        });
      })
    );
  }

  private subscribeToActions(): void {
    this.action = new FormControl(
      this.revalidation.revalidationType,
      Validators.required
    );
    this.revalidationForm.addControl("action", this.action);

    this.componentSubscriptions.push(
      this.action.valueChanges.subscribe((val) => {
        if (val === this.revalidationType.DEFER) {
          this.deferralReason.setValidators(Validators.required);
          this.deferralDate.setValidators(Validators.required);
        } else {
          this.deferralReason.clearValidators();
          this.deferralDate.clearValidators();
        }
        // update validity
        this.deferralReason.updateValueAndValidity();
        this.deferralDate.updateValueAndValidity();
        // enable disable all comments tick box
        if (val) {
          this.allComments.enable({ onlySelf: true, emitEvent: false });
        } else {
          this.allComments.disable({ onlySelf: true, emitEvent: false });
        }
      })
    );
  }
}
