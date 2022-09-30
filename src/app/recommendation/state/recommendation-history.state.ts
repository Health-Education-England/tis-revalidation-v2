import { State, Action, Selector, StateContext } from "@ngxs/store";

import { Get, Set, Post, Add } from "./recommendation-history.actions";
import { Injectable } from "@angular/core";
import { finalize, tap } from "rxjs/operators";
import {
  IRecommendationHistory,
  IRecommendationSummary,
  RecommendationStatus,
  DeferralReason,
  RecommendationGmcOutcome
} from "../recommendation-history.interface";
import { RecommendationHistoryService } from "../services/recommendation-history.service";
import { SpinnerService } from "src/app/shared/spinner/spinner.service";

export class RecommendationHistoryStateModel {
  public item: IRecommendationHistory;
}

@State<RecommendationHistoryStateModel>({
  name: "recommendationHistory",
  defaults: {
    item: {
      gmcNumber: null,
      fullName: null,
      curriculumEndDate: null,
      programmeMembershipType: null,
      currentGrade: null,
      deferralReasons: [],
      underNotice: null,
      revalidations: [],
      designatedBody: null,
      gmcSubmissionDate: null
    }
  }
})
@Injectable()
export class RecommendationHistoryState {
  constructor(
    private service: RecommendationHistoryService,
    private spinnerService: SpinnerService
  ) {}

  @Selector()
  public static recommendationHistory(
    state: RecommendationHistoryStateModel
  ): IRecommendationHistory {
    return state.item;
  }

  @Selector()
  public static recommendationSummary(
    state: RecommendationHistoryStateModel
  ): IRecommendationSummary[] {
    return state.item.revalidations;
  }

  @Selector()
  public static deferralReasons(
    state: RecommendationHistoryStateModel
  ): DeferralReason[] {
    return state.item.deferralReasons;
  }

  @Selector()
  public static enableRecommendation(
    state: RecommendationHistoryStateModel
  ): boolean {
    return (
      state.item.underNotice.toLowerCase() === "yes" &&
      !state.item.revalidations.some(
        (rs: IRecommendationSummary) =>
          rs.gmcOutcome === RecommendationGmcOutcome.UNDER_REVIEW
      )
    );
  }

  @Selector()
  public static currentRecommendation(
    state: RecommendationHistoryStateModel
  ): IRecommendationSummary {
    return state.item.revalidations.find((item: IRecommendationSummary) => {
      return (
        RecommendationStatus[item.recommendationStatus] !==
          RecommendationStatus.SUBMITTED_TO_GMC &&
        RecommendationStatus[item.recommendationStatus] !==
          RecommendationStatus.COMPLETED
      );
    });
  }

  @Selector([RecommendationHistoryState.currentRecommendation])
  public static currentRecommendationType(
    state: RecommendationHistoryState,
    currentRecommendation: IRecommendationSummary
  ): string {
    return currentRecommendation.recommendationType;
  }

  @Selector()
  public static editRecommendation(
    state: RecommendationHistoryStateModel
  ): boolean {
    const res = RecommendationHistoryState.currentRecommendation(state);
    return res ? true : false;
  }

  @Action(Get, { cancelUncompleted: true })
  get(ctx: StateContext<RecommendationHistoryStateModel>, action: Get) {
    // throw error if NotANumber NaN is passed as query parameter
    if (isNaN(action.payload)) {
      const err: Error = new Error(
        `gmcNumber ${action.payload} must be of type number`
      );
      throw err;
    }

    return this.service.getRecommendationHistory(action.payload).pipe(
      tap((result: IRecommendationHistory) => {
        ctx.patchState({
          item: result
        });
      }),
      finalize(() => {
        this.spinnerService.hideSpinner();
      })
    );
  }

  @Action(Set, { cancelUncompleted: true })
  set(_ctx: StateContext<any>, action: Set) {
    return this.service.saveRecommendation(action.payload);
  }

  @Action(Add, { cancelUncompleted: true })
  add(ctx: StateContext<any>, action: Add) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      item: {
        ...state.item,
        revalidations: [...state.item.revalidations, ...[action.payload]]
      }
    });
  }

  @Action(Post, { cancelUncompleted: true })
  post(_ctx: StateContext<any>, action: Post) {
    return this.service.submitRecommendationToGMC(
      action.gmcNumber,
      action.recommendationId,
      action.designatedBody
    );
  }
}
