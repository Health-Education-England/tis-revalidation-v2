import { HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { catchError, finalize, map, switchMap, take } from "rxjs/operators";
import { RecommendationsService } from "../services/recommendations.service";
import { IRecommendationsResponse } from "../recommendations.interfaces";
import { GetRecommendations } from "./recommendations.actions";
import { of } from "rxjs";

export class RecommendationsStateModel {
  public item: IRecommendationsResponse;
  public loading: boolean;
  public error?: string;
}

@State<RecommendationsStateModel>({
  name: "recommendations",
  defaults: {
    loading: false,
    error: null,
    item: {
      countTotal: null,
      countUnderNotice: null,
      totalPages: null,
      totalResults: null,
      traineeInfo: []
    }
  }
})
@Injectable()
export class RecommendationsState {
  constructor(private recommendationsService: RecommendationsService) {}

  @Selector()
  public static countTotal(state: RecommendationsStateModel) {
    return state.item.countTotal;
  }

  @Selector()
  public static countUnderNotice(state: RecommendationsStateModel) {
    return state.item.countUnderNotice;
  }

  @Action(GetRecommendations)
  get(
    ctx: StateContext<RecommendationsStateModel>,
    action: GetRecommendations
  ) {
    const params = action.payload;
    let httpParams = new HttpParams();

    Object.keys(params).forEach((key) => {
      const val = params[key];
      if (val) {
        httpParams = httpParams.append(key, val);
      }
    });

    ctx.patchState({
      item: null,
      loading: true
    });

    return this.recommendationsService.getRecommendations(httpParams).pipe(
      map((res: IRecommendationsResponse) => {
        ctx.patchState({
          item: res
        });
      }),
      catchError((err: any) => {
        ctx.patchState({
          error: `Error: ${err.message}`
        });
        return of(err);
      }),
      finalize(() =>
        ctx.patchState({
          loading: false
        })
      )
    );
  }
}
