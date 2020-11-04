import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { Observable, of, Subscription } from "rxjs";
import { catchError, distinctUntilChanged, take, tap } from "rxjs/operators";
import { AuthService } from "src/app/core/auth/auth.service";
import { SnackBarService } from "../../shared/services/snack-bar/snack-bar.service";
import {
  defaultRecommendation,
  DeferralReason,
  IRecommendationHistory,
  IRecommendationSummary,
  RecommendationType
} from "../recommendation-history.interface";

import { Get } from "../state/recommendation-history.actions";
import { RecommendationHistoryState } from "../state/recommendation-history.state";
import { CommentsComponent } from "src/app/details/comments/comments.component";
import { RecommendationHistoryService } from "../services/recommendation-history.service";

@Component({
  selector: "app-create-recommendation",
  templateUrl: "./create-recommendation.component.html",
  styleUrls: ["./create-recommendation.component.scss"]
})
export class CreateRecommendationComponent implements OnInit, OnDestroy {
  @Select(RecommendationHistoryState.deferralReasons)
  deferralReasons$: Observable<DeferralReason[]>;

  @Select(RecommendationHistoryState.currentRecommendation)
  recommendation$: Observable<IRecommendationSummary>;

  @Select(RecommendationHistoryState.recommendationHistory)
  recommendationHistory$: Observable<IRecommendationHistory>;

  componentSubscriptions: Subscription[] = [];
  deferralReasons: DeferralReason[] = [];
  deferralSubReasons: DeferralReason[] = [];
  recommendation: IRecommendationSummary;
  recommendationType = RecommendationType;

  gmcNumber: number;
  gmcSubmissionDate: Date;

  recommendationForm: FormGroup;
  action: FormControl;
  deferralDate: FormControl;
  deferralReason: FormControl;
  deferralSubReason: FormControl;
  @ViewChild(CommentsComponent) appComments: CommentsComponent;
  minReferralDate: Date;
  maxReferralDate: Date;
  deferSelected: boolean;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private snackBarService: SnackBarService,
    private router: Router,
    private auth: AuthService,
    private recommendationHistoryService: RecommendationHistoryService
  ) {}

  ngOnInit(): void {
    this.recommendationHistory$
      .pipe(take(1))
      .subscribe((recommendationHistory: IRecommendationHistory) => {
        if (recommendationHistory) {
          this.gmcSubmissionDate = new Date(
            recommendationHistory.gmcSubmissionDate
          );
          this.initComponent();
        }
      });
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
      const formValue = this.recommendationForm.value;
      this.recommendation.admin = this.auth.userName;
      this.recommendation.recommendationType = formValue.action;
      this.recommendation.comments = this.appComments.comments.value
        .filter((comments: { comment: string; checkbox: boolean }) => {
          return !!comments.comment.trim();
        })
        .map((comments: { comment: string; checkbox: boolean }) => {
          return comments.comment;
        });

      // Need to add one hour to negotiate BST
      const deferralDate = new Date(formValue.deferralDate);
      deferralDate.setHours(1);
      this.recommendation.deferralDate = deferralDate;
      this.recommendation.deferralReason = formValue.deferralReason;
      this.recommendation.deferralSubReason = formValue.deferralSubReason;
      this.recommendation.gmcNumber = this.gmcNumber;

      const redirectUrl = procced ? "../confirm" : "../";

      this.componentSubscriptions.push(
        this.recommendationHistoryService
          .saveRecommendation(this.recommendation)
          .pipe(
            tap(
              (res) => {
                if (!procced) {
                  this.successResponse(res);
                }
              },
              (error) => this.errorFnc(error)
            ),
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

  getDeferralDateErrorMessage(): string {
    let errorMessage = `Date is required and must be between ${this.minReferralDate.toLocaleDateString()} and ${this.maxReferralDate.toLocaleDateString()}`;

    if (this.maxReferralDate < new Date()) {
      errorMessage =
        "Dates cannot be calculated, please update the GMC submission date";
    }

    return errorMessage;
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
    this.subscribeToActions();
  }
  /**
   * submission date + 60 days < new deferral date < submission date + 365 days from GMC Submission date
   */
  private setMinMaxDeferralDates(): void {
    const today = new Date();
    const dateReference = (): Date => new Date(this.gmcSubmissionDate);

    const minReferralDate = new Date(
      dateReference().setDate(dateReference().getDate() + 60)
    );

    this.minReferralDate = minReferralDate < today ? today : minReferralDate;
    this.maxReferralDate = new Date(
      dateReference().setDate(dateReference().getDate() + 364)
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
    this.snackBarService.openSnackBar(err);
    return of(err);
  }

  private successResponse(res: any): Observable<any> {
    this.snackBarService.openSnackBar(
      "our recommendation was successfully saved"
    );
    return of(res);
  }
}
