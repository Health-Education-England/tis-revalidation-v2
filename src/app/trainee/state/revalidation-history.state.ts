import { State, Action, StateContext, Selector } from "@ngxs/store";
import { RevalidationHistoryAction } from "./revalidation-history.actions";
import { Injectable } from "@angular/core";
import { HttpParams } from "@angular/common/http";
import { RevalidationHistoryRespone2 } from "../mock-data/trainee-spec-data";
import { tap, catchError } from "rxjs/operators";
import { IRevalidationHistory } from "../revalidation-history.interface";
import { of } from "rxjs";
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

    const httpParam: HttpParams = new HttpParams().set(
      "id",
      action.payload.toString()
    );

    return this.service.getRevalidationHistory(httpParam).pipe(
      tap((result: IRevalidationHistory) => {
        ctx.patchState({
          item: result
        });
      }),
      // TODO: delete catchError used to mock Trainee Data here
      catchError((err: any) => {
        ctx.patchState({
          item: RevalidationHistoryRespone2
        });
        return of(err);
      })
    );
  }
}
