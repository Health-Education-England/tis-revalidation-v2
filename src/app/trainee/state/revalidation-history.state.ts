import { State, Action, Selector, StateContext } from "@ngxs/store";
import {
  patch,
  append,
  removeItem,
  insertItem,
  updateItem
} from "@ngxs/store/operators";

import {
  RevalidationHistoryAction,
  SaveRevalidationHistory,
  SubmitRevalidationHistoryToGMC,
  AddRevalidationHistory
} from "./revalidation-history.actions";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import {
  IRevalidationHistory,
  IRevalidation,
  RecommendationStatus,
  DeferralReason
} from "../revalidation-history.interface";
import { RevalidationHistoryService } from "../services/revalidation-history.service";
import { builtinModules } from "module";

export class RevalidationHistoryStateModel {
  public item: IRevalidationHistory;
}
export const defaultRecommendation = {
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
@State<RevalidationHistoryStateModel>({
  name: "revalidationHistory",
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
export class RevalidationHistoryState {
  constructor(private service: RevalidationHistoryService) {}

  @Selector()
  public static revalidationHistory(
    state: RevalidationHistoryStateModel
  ): IRevalidationHistory {
    return state.item;
  }

  @Selector()
  public static recommendationHistory(
    state: RevalidationHistoryStateModel
  ): IRevalidation[] {
    return state.item.revalidations;
  }

  @Selector()
  public static deferralReasons(
    state: RevalidationHistoryStateModel
  ): DeferralReason[] {
    return state.item.deferralReasons;
  }

  @Selector()
  public static enableRecommendation(
    state: RevalidationHistoryStateModel
  ): boolean {
    return state.item.underNotice.toLowerCase() === "yes";
  }

  @Selector()
  public static currentRecommendation(
    state: RevalidationHistoryStateModel
  ): IRevalidation {
    return state.item.revalidations.find((item: IRevalidation) => {
      return (
        RecommendationStatus[item.recommendationStatus] !==
        RecommendationStatus.SUBMITTED_TO_GMC
      );
    });
  }

  @Selector()
  public static editRecommendation(
    state: RevalidationHistoryStateModel
  ): boolean {
    const res = RevalidationHistoryState.currentRecommendation(state);
    return res ? true : false;
  }

  @Action(RevalidationHistoryAction, { cancelUncompleted: true })
  get(
    ctx: StateContext<RevalidationHistoryStateModel>,
    action: RevalidationHistoryAction
  ) {
    // throw error if NotANumber NaN is passed as query parameter
    if (isNaN(action.payload)) {
      const err: Error = new Error(
        `gmcNo ${action.payload} must be of type number`
      );
      throw err;
    }

    return this.service.getRevalidationHistory(action.payload).pipe(
      tap((result: IRevalidationHistory) => {
        ctx.patchState({
          item: result
        });
      })
    );
  }

  @Action(SaveRevalidationHistory, { cancelUncompleted: true })
  set(ctx: StateContext<any>, action: SaveRevalidationHistory) {
    return this.service.saveRecommendation(action.payload);
  }

  @Action(AddRevalidationHistory, { cancelUncompleted: true })
  add(ctx: StateContext<any>, action: AddRevalidationHistory) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      item: {
        ...state.item,
        revalidations: [...state.item.revalidations, ...[action.payload]]
      }
    });
  }

  @Action(SubmitRevalidationHistoryToGMC, { cancelUncompleted: true })
  post(ctx: StateContext<any>, action: SubmitRevalidationHistoryToGMC) {
    return this.service.submitRecommendationToGMC(
      action.gmcId,
      action.recommendationId
    );
  }
}
