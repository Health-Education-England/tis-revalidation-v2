import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { IRecommendation, IComment } from "../revalidation-history.interface";
import { Subscription } from "rxjs";

enum RevalidationActions {
  Revalidate,
  Defer,
  NonEngagement
}

@Component({
  selector: "app-revalidation-form",
  templateUrl: "./revalidation-form.component.html",
  styleUrls: ["./revalidation-form.component.scss"]
})
export class RevalidationFormComponent implements OnInit {
  revalidationForm: FormGroup;
  action: FormControl;
  deferralDate: FormControl;
  deferralReason: FormControl;
  comments: FormArray;

  @Input() recommendationHistory: IRecommendation;
  @Output() notify: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  actionSubscription: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.bindRecommendationData();
    this.bindFormControl();
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
    this.revalidationForm = new FormGroup({});
    this.createOptionalControls();
    this.createCommentControls();
    this.subscribeActions();
    this.notify.emit(this.revalidationForm);
  }

  private createOptionalControls(): void {
    this.deferralReason = new FormControl(
      this.recommendationHistory.deferralReason,
      Validators.required
    );

    this.deferralDate = new FormControl(
      this.recommendationHistory.deferralDate,
      Validators.required
    );
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

  private subscribeActions(): void {
    this.action = new FormControl(
      this.recommendationHistory.recommendation,
      Validators.required
    );
    this.revalidationForm.addControl("action", this.action);

    this.actionSubscription = this.action.valueChanges.subscribe((val) => {
      if (val === "Defer") {
        if (!this.revalidationForm.contains("deferralReason")) {
          this.revalidationForm.addControl(
            "deferralReason",
            this.deferralReason
          );
        }
        if (!this.revalidationForm.contains("deferralDate")) {
          this.revalidationForm.addControl("deferralDate", this.deferralDate);
        }
      } else {
        if (this.revalidationForm.contains("deferralReason")) {
          this.revalidationForm.removeControl("deferralReason");
        }
        if (this.revalidationForm.contains("deferralDate")) {
          this.revalidationForm.removeControl("deferralDate");
        }
      }
    });
  }
}
