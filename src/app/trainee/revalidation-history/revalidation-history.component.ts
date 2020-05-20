import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  OnDestroy,
  AfterViewChecked,
  ChangeDetectorRef
} from "@angular/core";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { RevalidationNotesComponent } from "../revalidation-notes/revalidation-notes.component";
import {
  IRevalidationHistory,
  IRecommendation
} from "../revalidation-history.interface";
import { RevalidationHistoryState } from "../state/revalidation-history.state";
import { Select } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map, shareReplay } from "rxjs/operators";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { MatHorizontalStepper } from "@angular/material/stepper";

@Component({
  selector: "app-revalidation-history",
  templateUrl: "./revalidation-history.component.html",
  styleUrls: ["./revalidation-history.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class RevalidationHistoryComponent implements OnInit, OnDestroy {
  @Select(RevalidationHistoryState.revalidationHistory)
  revalidationHistory$: Observable<IRevalidationHistory>;

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
  comments: FormArray;
  componentSubscriptions: Subscription[] = [];
  recommendationHistory: IRecommendation;

  constructor(
    private bottomSheet: MatBottomSheet,
    private breakpointObserver: BreakpointObserver
  ) {
    this.componentSubscriptions.push(
      this.revalidationHistory$.subscribe((res) => {
        this.recommendationHistory = res.recommendations.find((item) => {
          return item.submissionStatus === "draft";
        });

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
  }

  openNotes(): void {
    this.bottomSheet.open(RevalidationNotesComponent);
  }

  private bindRecommendationData(): void {
    if (!this.recommendationHistory) {
      this.recommendationHistory = {
        Id: null,
        recommendation: null,
        outcome: null,
        gmcSubDueDate: null,
        actSubDate: null,
        submittedBy: null,
        submissionStatus: null,
        comments: null,
        deferralReason: null
      };
    }
  }

  private bindFormControl(): void {
    this.confirmationForm = new FormGroup({
      confirm: new FormControl(false, Validators.requiredTrue)
    });
    this.revalidationForm = new FormGroup({});
    this.createVariableControls();
    this.createCommentControls();
    this.subscribeToActions();
  }

  private createVariableControls(): void {
    this.deferralReason = new FormControl(
      this.recommendationHistory.deferralReason,
      Validators.required
    );
    this.revalidationForm.addControl("deferralReason", this.deferralReason);

    this.deferralDate = new FormControl(
      this.recommendationHistory.deferralDate,
      Validators.required
    );
    this.revalidationForm.addControl("deferralDate", this.deferralDate);
  }

  private createCommentControls(): void {
    this.comments = new FormArray([new FormControl("")]);
    if (this.recommendationHistory.comments) {
      for (const comment of this.recommendationHistory.comments) {
        const commentControl = new FormControl(comment.comment);
        this.comments.push(commentControl);
      }
    }
    this.revalidationForm.addControl("comments", this.comments);
  }

  private subscribeToActions(): void {
    this.action = new FormControl(
      this.recommendationHistory.recommendation,
      Validators.required
    );
    this.revalidationForm.addControl("action", this.action);

    this.componentSubscriptions.push(
      this.action.valueChanges.subscribe((val) => {
        if (val === "Defer") {
          this.deferralReason.setValidators(Validators.required);
          this.deferralDate.setValidators(Validators.required);
        } else {
          this.deferralReason.clearValidators();
          this.deferralDate.clearValidators();
        }
        // update validity
        this.deferralReason.updateValueAndValidity();
        this.deferralDate.updateValueAndValidity();
      })
    );
  }
}
