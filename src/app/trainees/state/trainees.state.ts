import { HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { catchError, finalize, switchMap, take } from "rxjs/operators";
import {
  defaultRecordsState,
  RecordsState,
  RecordsStateModel
} from "../../shared/records/state/records.state";
import {
  IGetTraineesResponse,
  ITrainee,
  TraineesFilterType
} from "../trainees.interfaces";
import { TraineesService } from "../services/trainees.service";
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
} from "./trainees.actions";

export class TraineesStateModel extends RecordsStateModel<
  TraineesFilterType,
  ITrainee[]
> {
  public countTotal: number;
  public countUnderNotice: number;
}

@State<TraineesStateModel>({
  name: "trainees",
  defaults: {
    countTotal: null,
    countUnderNotice: null,
    ...defaultRecordsState
  }
})
@Injectable()
export class TraineesState extends RecordsState {
  constructor(private traineesService: TraineesService) {
    super();
  }

  @Selector()
  public static countTotal(state: TraineesStateModel) {
    return state.countTotal;
  }

  @Selector()
  public static countUnderNotice(state: TraineesStateModel) {
    return state.countUnderNotice;
  }

  @Action(Get)
  get(ctx: StateContext<TraineesStateModel>) {
    super.getHandler(ctx);

    const params: HttpParams = this.traineesService.generateParams();

    return this.traineesService
      .getTrainees(params)
      .pipe(
        take(1),
        switchMap((response: IGetTraineesResponse) =>
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
  getSuccess(ctx: StateContext<TraineesStateModel>, action: GetSuccess) {
    super.getSuccessHandler(ctx, action);

    return ctx.patchState({
      countTotal: action.response.countTotal,
      countUnderNotice: action.response.countUnderNotice
    });
  }

  @Action(GetError)
  getError(ctx: StateContext<TraineesStateModel>, action: GetError) {
    return super.getErrorHandler(ctx, action);
  }

  @Action(Sort)
  sort(ctx: StateContext<TraineesStateModel>, action: Sort) {
    return super.sortHandler(ctx, action);
  }

  @Action(ResetSort)
  resetSort(ctx: StateContext<TraineesStateModel>) {
    return super.resetSortHandler(ctx);
  }

  @Action(Paginate)
  paginate(ctx: StateContext<TraineesStateModel>, action: Paginate) {
    return super.paginateHandler(ctx, action);
  }

  @Action(ResetPaginator)
  resetPaginator(ctx: StateContext<TraineesStateModel>) {
    return super.resetPaginatorHandler(ctx);
  }

  @Action(Search)
  search(ctx: StateContext<TraineesStateModel>, action: Search) {
    return super.searchHandler(ctx, action);
  }

  @Action(ClearSearch)
  clearSearch(ctx: StateContext<TraineesStateModel>) {
    return super.clearSearchHandler(ctx);
  }

  @Action(Filter)
  filter(ctx: StateContext<TraineesStateModel>, action: Filter) {
    return super.filterHandler(ctx, action);
  }
}
