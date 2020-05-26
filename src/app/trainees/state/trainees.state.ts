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
import { RevalidationStatus } from "../../trainee/revalidation-history.interface";
import { DEFAULT_SORT } from "../constants";
import { TraineesService } from "../services/trainees.service";
import {
  IGetTraineesResponse,
  ITrainee,
  TraineesFilterType
} from "../trainees.interfaces";
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
  constructor(
    private traineesService: TraineesService,
    protected recordsService: RecordsService
  ) {
    super(recordsService);
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
    const params: HttpParams = this.traineesService.generateParams();
    const endPoint = `${environment.appUrls.getTrainees}`;
    super.getHandler(ctx);

    return this.recordsService
      .getRecords(endPoint, params)
      .pipe(
        take(1),
        map((response: IGetTraineesResponse) => {
          response.traineeInfo.forEach(
            (item: ITrainee) =>
              (item.doctorStatus = RevalidationStatus[item.doctorStatus])
          );
          return response;
        }),
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
    super.getSuccessHandler(ctx, action, "traineeInfo");

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
    return super.resetSortHandler(ctx, DEFAULT_SORT);
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
