import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Sort } from "@angular/material/sort";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { DEFAULT_SORT } from "../../core/trainee/constants";
import {
  ITrainee,
  TraineesFilterType
} from "../../core/trainee/trainee.interfaces";
import { TraineeService } from "../../core/trainee/trainee.service";
import {
  ClearTraineesSearch,
  GetTrainees,
  PaginateTrainees,
  ResetTraineesPaginator,
  ResetTraineesSort,
  SearchTrainees,
  SortTrainees,
  AllDoctorsFilter,
  UnderNoticeFilter
} from "./trainees.actions";

export class TraineesStateModel {
  public countTotal: number;
  public countUnderNotice: number;
  public filter: TraineesFilterType;
  public items: ITrainee[];
  public loading: boolean;
  public pageIndex: number;
  public searchQuery: string;
  public sort: Sort;
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

  @Action(GetTrainees)
  getTrainees(ctx: StateContext<TraineesStateModel>) {
    ctx.patchState({
      items: null,
      loading: true
    });

    const params: HttpParams = this.traineeService.generateParams();

    return this.traineeService.getTrainees(params).pipe(
      tap((result) => {
        ctx.patchState({
          items: result.traineeInfo,
          countTotal: result.countTotal,
          countUnderNotice: result.countUnderNotice,
          totalResults: result.totalResults,
          loading: false
        });
      })
    );
  }

  @Action(SortTrainees)
  sortTrainees(ctx: StateContext<TraineesStateModel>, action: SortTrainees) {
    return ctx.patchState({
      sort: {
        active: action.column,
        direction: action.direction
      }
    });
  }

  @Action(ResetTraineesSort)
  resetTraineesSort(ctx: StateContext<TraineesStateModel>) {
    return ctx.patchState({
      sort: DEFAULT_SORT
    });
  }

  @Action(PaginateTrainees)
  paginateTrainees(
    ctx: StateContext<TraineesStateModel>,
    action: PaginateTrainees
  ) {
    return ctx.patchState({
      pageIndex: action.pageIndex
    });
  }

  @Action(ResetTraineesPaginator)
  resetTraineesPaginator(ctx: StateContext<TraineesStateModel>) {
    return ctx.patchState({
      pageIndex: 0
    });
  }

  @Action(SearchTrainees)
  searchTrainees(
    ctx: StateContext<TraineesStateModel>,
    action: SearchTrainees
  ) {
    return ctx.patchState({
      searchQuery: action.searchQuery
    });
  }

  @Action(ClearTraineesSearch)
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
