import { State, Action, Selector, StateContext } from "@ngxs/store";

import { Get, Set, Post, Add } from "./recommendation-history.actions";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import {
  IRecommendationHistory,
  IRecommendationSummary,
  RecommendationStatus,
  DeferralReason
} from "../recommendation-history.interface";
import { RecommendationHistoryService } from "../services/recommendation-history.service";

export class RecommendationHistoryStateModel {
  public item: IRecommendationHistory;
}
export const defaultRecommendation: IRecommendationSummary = {
  actualSubmissionDate: null,
  admin: null,
  comments: [],
  deferralComment: null,
  deferralDate: null,
  deferralReason: null,
  deferralSubReason: null,
  gmcNumber: null,
  gmcOutcome: null,
  gmcRevalidationId: null,
  gmcSubmissionDate: null,
  recommendationId: null,
  recommendationStatus: null,
  recommendationType: null
};
@State<RecommendationHistoryStateModel>({
  name: "recommendationHistory",
  defaults: {
    item: {
      gmcNumber: null,
      fullName: null,
      cctDate: null,
      programmeMembershipType: null,
      currentGrade: null,
      deferralReasons: [],
      underNotice: null,
      revalidations: [defaultRecommendation]
    }
  }
})
@Injectable()
export class RecommendationHistoryState {
  constructor(private service: RecommendationHistoryService) {}

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
    return state.item.underNotice.toLowerCase() === "yes";
  }

  @Selector()
  public static currentRecommendation(
    state: RecommendationHistoryStateModel
  ): IRecommendationSummary {
    return state.item.revalidations.find((item: IRecommendationSummary) => {
      return (
        RecommendationStatus[item.recommendationStatus] !==
        RecommendationStatus.SUBMITTED_TO_GMC
      );
    });
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
        `gmcNo ${action.payload} must be of type number`
      );
      throw err;
    }

    return this.service.getrecommendationHistory(action.payload).pipe(
      tap((result: IRecommendationHistory) => {
        ctx.patchState({
          item: result
        });
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
      action.gmcId,
      action.recommendationId
    );
  }
}
