import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { Observable, of } from "rxjs";
import { catchError, filter, take, tap } from "rxjs/operators";
import { SnackBarService } from "../../shared/services/snack-bar/snack-bar.service";
import {
  IRecommendationHistory,
  IRecommendationSummary,
  RecommendationType
} from "../recommendation-history.interface";
import { RecommendationHistoryService } from "../services/recommendation-history.service";
import { Get, Post } from "../state/recommendation-history.actions";
import { RecommendationHistoryState } from "../state/recommendation-history.state";

@Component({
  selector: "app-confirm-recommendation",
  templateUrl: "./confirm-recommendation.component.html"
})
export class ConfirmRecommendationComponent implements OnInit {
  public form: FormGroup;
  public gmcNumber: number;
  public recommendationId: string;
  public recommendationType = RecommendationType;
  public designatedBody: string;

  @Select(RecommendationHistoryState.currentRecommendationType)
  public currentRecommendationType$: Observable<string>;

  @Select(RecommendationHistoryState.editRecommendation)
  public editRecommendation$: Observable<boolean>;

  @Select(RecommendationHistoryState.currentRecommendation)
  public currentRecommendation$: Observable<IRecommendationSummary>;

  @Select(RecommendationHistoryState.recommendationHistory)
  public recommendationHistory$: Observable<IRecommendationHistory>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store,
    private snackBarService: SnackBarService,
    private recommendationHistoryService: RecommendationHistoryService
  ) {}

  ngOnInit(): void {
    this.setupForm();
    this.getCurrentRecommendation();
  }

  public setupForm(): void {
    this.form = this.formBuilder.group({
      confirm: [false, Validators.requiredTrue]
    });
  }

  public submitToGMC(): void {
    this.recommendationHistoryService
      .submitRecommendationToGMC(
        this.gmcNumber,
        this.recommendationId,
        this.designatedBody
      )
      .pipe(
        catchError(() =>
          of(
            this.snackBarService.openSnackBar("An error occurred! please retry")
          )
        ),
        tap(() =>
          of(
            this.snackBarService.openSnackBar(
              "Your recommendation was successfully submitted to GMC"
            )
          )
        )
      )
      .subscribe(() => {
        this.store
          .dispatch(new Get(this.gmcNumber))
          .subscribe(() => this.navigateToParent());
      });
  }

  public reset(): void {
    this.form.reset();
    this.navigateToParent();
  }

  private navigateToParent(): void {
    this.router.navigate(["../"], { relativeTo: this.activatedRoute });
  }

  private getCurrentRecommendation(): void {
    this.currentRecommendation$
      .pipe(
        filter((res) => res && res.recommendationId !== null),
        take(1)
      )
      .subscribe((currentRecommendation: IRecommendationSummary) => {
        if (currentRecommendation) {
          this.recommendationId = currentRecommendation.recommendationId;
          this.gmcNumber = Number(currentRecommendation.gmcNumber);
        }
      });

    this.recommendationHistory$
      .pipe(take(1))
      .subscribe((recommendationHistory: IRecommendationHistory) => {
        if (recommendationHistory) {
          this.designatedBody = recommendationHistory.designatedBody;
        }
      });
  }
}
