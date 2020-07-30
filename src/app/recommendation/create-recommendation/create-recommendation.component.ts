import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "@environment";
import { Select, Store } from "@ngxs/store";
import { Observable, of, Subscription } from "rxjs";
import { catchError, distinctUntilChanged, tap } from "rxjs/operators";
import { AuthService } from "src/app/core/auth/auth.service";
import { CommentsService } from "src/app/details/comments-tool-bar/comments.service";
import { SnackBarService } from "../../shared/services/snack-bar/snack-bar.service";
import {
  defaultRecommendation,
  DeferralReason,
  IRecommendationSummary,
  RecommendationType
} from "../recommendation-history.interface";

import { Get, Set } from "../state/recommendation-history.actions";
import { RecommendationHistoryState } from "../state/recommendation-history.state";

@Component({
  selector: "app-create-recommendation",
  templateUrl: "./create-recommendation.component.html"
})
export class CreateRecommendationComponent implements OnInit, OnDestroy {
  @Select(RecommendationHistoryState.deferralReasons)
  deferralReasons$: Observable<DeferralReason[]>;
  @Select(RecommendationHistoryState.currentRecommendation)
  recommendation$: Observable<IRecommendationSummary>;

  componentSubscriptions: Subscription[] = [];
  deferralReasons: DeferralReason[] = [];
  deferralSubReasons: DeferralReason[] = [];
  recommendation: IRecommendationSummary;
  recommendationType = RecommendationType;

  gmcNumber: number;

  recommendationForm: FormGroup;
  action: FormControl;
  deferralDate: FormControl;
  deferralReason: FormControl;
  deferralSubReason: FormControl;
  comments: FormArray;
  minReferralDate: Date;
  maxReferralDate: Date;
  dateFormat = environment.dateFormat;
  deferSelected: boolean;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private snackBarService: SnackBarService,
    private router: Router,
    private commentsService: CommentsService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.initComponent();
  }

  ngOnDestroy(): void {
    this.componentSubscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  initComponent(): void {
    this.componentSubscriptions.push(
      this.deferralReasons$
        .pipe(
          tap((res: DeferralReason[]) => {
            if (res) {
              this.deferralReasons = res;
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
    this.setGmcNumber();
  }

  resetForm(): void {
    this.recommendationForm.reset();
    this.router.navigate(["../"], { relativeTo: this.activatedRoute });
  }

  /**
   * saves form changes as draft
   * @param procced if procced to confirmation is set to true
   */
  saveDraft(procced: boolean): void {
    if (this.recommendationForm.valid) {
      // map form data
      const formValue = this.recommendationForm.value;
      this.recommendation.admin = this.auth.userName;
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

      const redirectUrl = procced ? "../confirm" : "../";
      this.componentSubscriptions.push(
        this.store
          .dispatch(new Set(this.recommendation))
          .pipe(
            tap((res) => {
              if (!procced) {
                this.successResponse(res);
              }
            }),
            catchError(this.errorFnc)
          )
          .subscribe(() => {
            this.store.dispatch(new Get(this.gmcNumber)).subscribe(() => {
              this.router.navigate([redirectUrl], {
                relativeTo: this.activatedRoute
              });
            });
          })
      );
    }
  }

  private setGmcNumber(): void {
    this.gmcNumber = Number(
      this.activatedRoute.parent.snapshot.params.gmcNumber
    );
  }

  private bindFormControl(): void {
    this.recommendationForm = new FormGroup({});
    this.setMinMaxDeferralDates();
    this.createVariableControls();
    this.createCommentControls();
    this.subscribeToActions();
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
    this.commentsService.comments = this.comments;
    if (this.recommendation.comments) {
      for (const comment of this.recommendation.comments) {
        this.commentsService.addCommentControl(comment);
      }
    }
    this.commentsService.addCommentControl();
    this.recommendationForm.addControl("comments", this.comments);
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
      })
    );
    this.action.updateValueAndValidity();
    this.recommendationForm.addControl("action", this.action);
  }
  private errorFnc(err: any): Observable<any> {
    this.snackBarService.openSnackBar(`An error occurred! please retry`);
    return of(err);
  }

  private successResponse(res: any): Observable<any> {
    this.snackBarService.openSnackBar(
      "our recommendation was successfully saved"
    );
    return of(res);
  }
}
