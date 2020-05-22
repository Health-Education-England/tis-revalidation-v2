import { State, Action, StateContext, Selector } from "@ngxs/store";
import { RevalidationHistoryAction } from "./revalidation-history.actions";
import { Injectable } from "@angular/core";
import { HttpParams } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { IRevalidationHistory } from "../revalidation-history.interface";
import { RevalidationHistoryService } from "../services/revalidation-history.service";

export class RevalidationHistoryStateModel {
  public item: IRevalidationHistory;
}

@State<RevalidationHistoryStateModel>({
  name: "revalidationHistory",
  defaults: {
    item: null
  }
})
@Injectable()
export class RevalidationHistoryState {
  constructor(private service: RevalidationHistoryService) {}

  @Selector()
  public static revalidationHistory(state: RevalidationHistoryStateModel) {
    return state.item;
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
}
