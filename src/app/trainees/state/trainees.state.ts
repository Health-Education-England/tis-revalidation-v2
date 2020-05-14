import { HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Sort as ISort } from "@angular/material/sort";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { catchError, finalize, switchMap, take } from "rxjs/operators";
import { DEFAULT_SORT } from "../../core/trainee/constants";
import {
  IGetTraineesResponse,
  ITrainee,
  TraineesFilterType
} from "../../core/trainee/trainee.interfaces";
import { TraineeService } from "../../core/trainee/trainee.service";
import {
  AllDoctorsFilter,
  ClearSearch,
  Get,
  GetError,
  GetSuccess,
  Paginate,
  ResetPaginator,
  ResetSort,
  Search,
  Sort,
  UnderNoticeFilter
} from "./trainees.actions";

export class TraineesStateModel {
  public countTotal: number;
  public countUnderNotice: number;
  public error?: string;
  public filter: TraineesFilterType;
  public items: ITrainee[];
  public loading: boolean;
  public pageIndex: number;
  public searchQuery: string;
  public sort: ISort;
  public totalPages: number;
  public totalResults: number;
}

@State<TraineesStateModel>({
  name: "trainees",
  defaults: {
    countTotal: null,
    countUnderNotice: null,
    filter: null,
    items: null,
    loading: null,
    pageIndex: 0,
    searchQuery: null,
    totalPages: null,
    sort: {
      active: null,
      direction: null
    },
    totalResults: null
  }
})
@Injectable()
export class TraineesState {
  constructor(private traineeService: TraineeService) {}

  @Selector()
  public static trainees(state: TraineesStateModel) {
    return state.items;
  }

  @Selector()
  public static loading(state: TraineesStateModel) {
    return state.loading;
  }

  @Selector()
  public static sort(state: TraineesStateModel) {
    return state.sort;
  }

  @Selector()
  public static countTotal(state: TraineesStateModel) {
    return state.countTotal;
  }

  @Selector()
  public static countUnderNotice(state: TraineesStateModel) {
    return state.countUnderNotice;
  }

  @Selector()
  public static totalResults(state: TraineesStateModel) {
    return state.totalResults;
  }

  @Selector()
  public static error(state: TraineesStateModel) {
    return state.error;
  }

  @Selector()
  public static pageIndex(state: TraineesStateModel) {
    return state.pageIndex;
  }

  @Selector()
  public static searchQuery(state: TraineesStateModel) {
    return state.searchQuery;
  }

  @Selector()
  public static filter(state: TraineesStateModel) {
    return state.filter;
  }

  @Action(Get)
  getTrainees(ctx: StateContext<TraineesStateModel>) {
    ctx.patchState({
      items: null,
      loading: true
    });

    const params: HttpParams = this.traineeService.generateParams();

    return this.traineeService
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
  getTraineesSuccess(
    ctx: StateContext<TraineesStateModel>,
    action: GetSuccess
  ) {
    return ctx.patchState({
      items: action.response.traineeInfo,
      countTotal: action.response.countTotal,
      countUnderNotice: action.response.countUnderNotice,
      totalResults: action.response.totalResults
    });
  }

  @Action(GetError)
  getTraineesError(ctx: StateContext<TraineesStateModel>, action: GetError) {
    return ctx.patchState({
      error: `Error: ${action.error.message}`
    });
  }

  @Action(Sort)
  sortTrainees(ctx: StateContext<TraineesStateModel>, action: Sort) {
    return ctx.patchState({
      sort: {
        active: action.column,
        direction: action.direction
      }
    });
  }

  @Action(ResetSort)
  resetTraineesSort(ctx: StateContext<TraineesStateModel>) {
    return ctx.patchState({
      sort: DEFAULT_SORT
    });
  }

  @Action(Paginate)
  paginateTrainees(ctx: StateContext<TraineesStateModel>, action: Paginate) {
    return ctx.patchState({
      pageIndex: action.pageIndex
    });
  }

  @Action(ResetPaginator)
  resetTraineesPaginator(ctx: StateContext<TraineesStateModel>) {
    return ctx.patchState({
      pageIndex: 0
    });
  }

  @Action(Search)
  searchTrainees(ctx: StateContext<TraineesStateModel>, action: Search) {
    return ctx.patchState({
      searchQuery: action.searchQuery
    });
  }

  @Action(ClearSearch)
  clearTraineesSearch(ctx: StateContext<TraineesStateModel>) {
    return ctx.patchState({
      searchQuery: null
    });
  }

  @Action(UnderNoticeFilter)
  underNoticeFilter(ctx: StateContext<TraineesStateModel>) {
    return ctx.patchState({
      filter: TraineesFilterType.UNDER_NOTICE
    });
  }

  @Action(AllDoctorsFilter)
  allDoctorsFilter(ctx: StateContext<TraineesStateModel>) {
    return ctx.patchState({
      filter: TraineesFilterType.ALL_DOCTORS
    });
  }
}
