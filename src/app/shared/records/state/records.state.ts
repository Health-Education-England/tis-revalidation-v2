import { Sort } from "@angular/material/sort";
import { Sort as ISort } from "@angular/material/sort/sort";
import { createSelector, StateContext } from "@ngxs/store";
import { RecordsService } from "../services/records.service";

export class RecordsStateModel<T, F> {
  public error?: string;
  public filter: T;
  public items: F;
  public loading: boolean;
  public pageIndex: number;
  public searchQuery: string;
  public sort: ISort;
  public totalPages: number;
  public totalResults: number;
}

export const defaultRecordsState = {
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
};

export class RecordsState {
  constructor(protected recordsService: RecordsService) {}

  static items<T>() {
    return createSelector([this], (state: { items: T[] }) => {
      return state.items;
    });
  }

  static loading<T>() {
    return createSelector([this], (state: { loading: boolean }) => {
      return state.loading;
    });
  }

  static sort<T>() {
    return createSelector([this], (state: { sort: ISort }) => {
      return state.sort;
    });
  }

  static totalResults<T>() {
    return createSelector([this], (state: { totalResults: number }) => {
      return state.totalResults;
    });
  }

  static error<T>() {
    return createSelector([this], (state: { error: string }) => {
      return state.error;
    });
  }

  static pageIndex<T>() {
    return createSelector([this], (state: { pageIndex: number }) => {
      return state.pageIndex;
    });
  }

  static searchQuery<T>() {
    return createSelector([this], (state: { searchQuery: string }) => {
      return state.searchQuery;
    });
  }

  static filter<T>() {
    return createSelector([this], (state: { filter: T }) => {
      return state.filter;
    });
  }

  protected getHandler(ctx: StateContext<any>) {
    ctx.patchState({
      items: null,
      loading: true
    });
  }

  protected getSuccessHandler(
    ctx: StateContext<any>,
    action: any,
    sliceName: string
  ) {
    ctx.patchState({
      items: action.response[sliceName],
      totalResults: action.response.totalResults
    });
  }

  protected getErrorHandler(ctx: StateContext<any>, action: any) {
    ctx.patchState({
      error: `Error: ${action.error.message}`
    });
  }

  protected sortHandler(ctx: StateContext<any>, action: any) {
    ctx.patchState({
      sort: {
        active: action.column,
        direction: action.direction
      }
    });
  }

  protected resetSortHandler(ctx: StateContext<any>, sortOptions: Sort) {
    ctx.patchState({
      sort: sortOptions
    });
  }

  protected paginateHandler(ctx: StateContext<any>, action: any) {
    ctx.patchState({
      pageIndex: action.pageIndex
    });
  }

  protected resetPaginatorHandler(ctx: StateContext<any>) {
    ctx.patchState({
      pageIndex: 0
    });
  }

  protected searchHandler(ctx: StateContext<any>, action: any) {
    ctx.patchState({
      searchQuery: action.searchQuery
    });
  }

  protected clearSearchHandler(ctx: StateContext<any>) {
    ctx.patchState({
      searchQuery: null
    });
  }

  protected filterHandler(ctx: StateContext<any>, action: any) {
    ctx.patchState(action);
  }
}
