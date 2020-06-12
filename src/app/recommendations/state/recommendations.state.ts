import { HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { catchError, finalize, map, switchMap, take } from "rxjs/operators";
import { RecordsService } from "../../shared/records/services/records.service";
import {
  defaultRecordsState,
  RecordsState,
  RecordsStateModel
} from "../../shared/records/state/records.state";
import { RecommendationStatus } from "../../recommendation/recommendation-history.interface";
import { DEFAULT_SORT } from "../../shared/records/constants";
import { RecommendationsService } from "../services/recommendations.service";
import {
  IGetRecommendationsResponse,
  IRecommendation,
  RecommendationsFilterType
} from "../recommendations.interfaces";
import {
  ClearSearch,
  Filter,
  Get,
  GetError,
  GetSuccess,
  Paginate,
  ResetPaginator,
  ResetSort,
  Search,
  Sort
} from "./recommendations.actions";

export class RecommendationsStateModel extends RecordsStateModel<
  RecommendationsFilterType,
  IRecommendation[]
> {
  public countTotal: number;
  public countUnderNotice: number;
}

@State<RecommendationsStateModel>({
  name: "recommendations",
  defaults: {
    countTotal: null,
    countUnderNotice: null,
    ...defaultRecordsState
  }
})
@Injectable()
export class RecommendationsState extends RecordsState {
  constructor(
    private recommendationsService: RecommendationsService,
    protected recordsService: RecordsService
  ) {
    super(recordsService);
  }

  @Selector()
  public static countTotal(state: RecommendationsStateModel) {
    return state.countTotal;
  }

  @Selector()
  public static countUnderNotice(state: RecommendationsStateModel) {
    return state.countUnderNotice;
  }

  @Action(Get)
  get(ctx: StateContext<RecommendationsStateModel>) {
    const params: HttpParams = this.recommendationsService.generateParams();
    const endPoint = `${environment.appUrls.getRecommendations}`;
    super.getHandler(ctx);

    return this.recordsService
      .getRecords(endPoint, params)
      .pipe(
        take(1),
        map((response: IGetRecommendationsResponse) => {
          response.traineeInfo.forEach(
            (item: IRecommendation) =>
              (item.doctorStatus = RecommendationStatus[item.doctorStatus])
          );
          return response;
        }),
        switchMap((response: IGetRecommendationsResponse) =>
          ctx.dispatch(new GetSuccess(response))
        ),
        catchError((error: HttpErrorResponse) =>
          ctx.dispatch(new GetError(error))
        ),
        finalize(() =>
          ctx.patchState({
            loading: false
          })
        )
      )
      .subscribe();
  }

  @Action(GetSuccess)
  getSuccess(ctx: StateContext<RecommendationsStateModel>, action: GetSuccess) {
    super.getSuccessHandler(ctx, action, "traineeInfo");

    return ctx.patchState({
      countTotal: action.response.countTotal,
      countUnderNotice: action.response.countUnderNotice
    });
  }

  @Action(GetError)
  getError(ctx: StateContext<RecommendationsStateModel>, action: GetError) {
    return super.getErrorHandler(ctx, action);
  }

  @Action(Sort)
  sort(ctx: StateContext<RecommendationsStateModel>, action: Sort) {
    return super.sortHandler(ctx, action);
  }

  @Action(ResetSort)
  resetSort(ctx: StateContext<RecommendationsStateModel>) {
    return super.resetSortHandler(ctx, DEFAULT_SORT);
  }

  @Action(Paginate)
  paginate(ctx: StateContext<RecommendationsStateModel>, action: Paginate) {
    return super.paginateHandler(ctx, action);
  }

  @Action(ResetPaginator)
  resetPaginator(ctx: StateContext<RecommendationsStateModel>) {
    return super.resetPaginatorHandler(ctx);
  }

  @Action(Search)
  search(ctx: StateContext<RecommendationsStateModel>, action: Search) {
    return super.searchHandler(ctx, action);
  }

  @Action(ClearSearch)
  clearSearch(ctx: StateContext<RecommendationsStateModel>) {
    return super.clearSearchHandler(ctx);
  }

  @Action(Filter)
  filter(ctx: StateContext<RecommendationsStateModel>, action: Filter) {
    return super.filterHandler(ctx, action);
  }
}
