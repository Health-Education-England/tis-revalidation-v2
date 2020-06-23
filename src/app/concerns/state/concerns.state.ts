import { HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment";
import { Action, State, StateContext } from "@ngxs/store";
import { catchError, finalize, map, switchMap, take } from "rxjs/operators";
import { RecommendationStatus } from "../../recommendation/recommendation-history.interface";
import { DEFAULT_SORT } from "../../shared/records/constants";
import { RecordsService } from "../../shared/records/services/records.service";
import {
  defaultRecordsState,
  RecordsState,
  RecordsStateModel
} from "../../shared/records/state/records.state";
import {
  ConcernsFilterType,
  IConcern,
  IGetConcernsResponse
} from "../concerns.interfaces";
import { ConcernsService } from "../services/concerns.service";
import {
  ClearSearch,
  Filter,
  Get,
  GetError,
  GetSuccess,
  Paginate,
  ResetFilter,
  ResetPaginator,
  ResetSort,
  Search,
  Sort
} from "./concerns.actions";

export class ConcernsStateModel extends RecordsStateModel<
  ConcernsFilterType,
  IConcern[]
> {
  public filter: ConcernsFilterType;
}

@State<ConcernsStateModel>({
  name: "concerns",
  defaults: {
    filter: ConcernsFilterType.OPEN,
    ...defaultRecordsState
  }
})
@Injectable()
export class ConcernsState extends RecordsState {
  constructor(
    private concernsService: ConcernsService,
    protected recordsService: RecordsService
  ) {
    super(recordsService);
  }

  @Action(Get)
  get(ctx: StateContext<ConcernsStateModel>) {
    const params: HttpParams = this.concernsService.generateParams();
    const endPoint = `${environment.appUrls.getConcerns}`;
    super.getHandler(ctx);

    return this.recordsService
      .getRecords(endPoint, params)
      .pipe(
        take(1),
        map((response: IGetConcernsResponse) => {
          response.concernTrainees.forEach(
            (item: IConcern) =>
              (item.status = RecommendationStatus[item.status])
          );
          return response;
        }),
        switchMap((response: IGetConcernsResponse) =>
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
  getSuccess(ctx: StateContext<ConcernsStateModel>, action: GetSuccess) {
    return super.getSuccessHandler(ctx, action, "concernTrainees");
  }

  @Action(GetError)
  getError(ctx: StateContext<ConcernsStateModel>, action: GetError) {
    return super.getErrorHandler(ctx, action);
  }

  @Action(Sort)
  sort(ctx: StateContext<ConcernsStateModel>, action: Sort) {
    return super.sortHandler(ctx, action);
  }

  @Action(ResetSort)
  resetSort(ctx: StateContext<ConcernsStateModel>) {
    return super.resetSortHandler(ctx, DEFAULT_SORT);
  }

  @Action(Paginate)
  paginate(ctx: StateContext<ConcernsStateModel>, action: Paginate) {
    return super.paginateHandler(ctx, action);
  }

  @Action(ResetPaginator)
  resetPaginator(ctx: StateContext<ConcernsStateModel>) {
    return super.resetPaginatorHandler(ctx);
  }

  @Action(Search)
  search(ctx: StateContext<ConcernsStateModel>, action: Search) {
    return super.searchHandler(ctx, action);
  }

  @Action(ClearSearch)
  clearSearch(ctx: StateContext<ConcernsStateModel>) {
    return super.clearSearchHandler(ctx);
  }

  @Action(Filter)
  filter(ctx: StateContext<ConcernsStateModel>, action: Filter) {
    return super.filterHandler(ctx, action);
  }

  @Action(ResetFilter)
  resetFilter(ctx: StateContext<ConcernsStateModel>) {
    return super.resetFilterHandler(ctx, ConcernsFilterType.OPEN);
  }
}
