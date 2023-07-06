import { Sort } from "@angular/material/sort";
import { Sort as ISort } from "@angular/material/sort/sort";
import { createSelector, StateContext } from "@ngxs/store";
import { patch, updateItem } from "@ngxs/store/operators";
import { DEFAULT_SORT } from "../constants";
import { ITotalCounts } from "../records.interfaces";
import { RecordsService } from "../services/records.service";
import { Params } from "@angular/router";
export class RecordsStateModel<T, F, T2 = {}> {
  public allChecked: boolean;
  public enableAllocateAdmin?: boolean;
  public error?: string;
  public filter: T;
  public items: F;
  public loading: boolean;
  public pageIndex: number;
  public searchQuery: string;
  public someChecked: boolean;
  public sort: ISort;
  public totalPages: number;
  public totalResults: number;
  public totalCounts: ITotalCounts;
  public tableFilters: T2;
  public queryParams: Params;
}

export const defaultRecordsState = {
  allChecked: false,
  items: null,
  loading: null,
  pageIndex: 0,
  searchQuery: null,
  someChecked: false,
  sort: DEFAULT_SORT,
  totalPages: null,
  totalResults: null,
  totalCounts: null,
  tableFilters: null,
  queryParams: null
};

export class RecordsState {
  constructor(protected recordsService: RecordsService) {}

  static totalCounts<T>() {
    return createSelector([this], (state: { totalCounts: ITotalCounts }) => {
      return state.totalCounts;
    });
  }

  static allChecked<T>() {
    return createSelector([this], (state: { allChecked: boolean }) => {
      return state.allChecked;
    });
  }

  static someChecked<T>() {
    return createSelector([this], (state: { someChecked: boolean }) => {
      return state.someChecked;
    });
  }

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

  static tableFilters<T2>() {
    return createSelector([this], (state: { tableFilters: T2 }) => {
      return state.tableFilters;
    });
  }

  static enableAllocateAdmin<T>() {
    return createSelector([this], (state: { enableAllocateAdmin: boolean }) => {
      return state.enableAllocateAdmin;
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
      totalResults: action.response.totalResults,
      allChecked: false,
      someChecked: false
    });
  }

  protected getErrorHandler(ctx: StateContext<any>, action: any) {
    ctx.patchState({
      error: action.error
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

  protected resetFilterHandler(ctx: StateContext<any>, action: any) {
    ctx.patchState({ filter: action });
  }

  protected setTableFiltersHandler(ctx: StateContext<any>, action: any) {
    ctx.patchState({
      tableFilters: action.tableFilters
    });
  }

  protected clearTableFiltersHandler(ctx: StateContext<any>) {
    ctx.patchState({
      tableFilters: null
    });
  }

  protected enableAllocateAdminHandler(ctx: StateContext<any>, action: any) {
    ctx.patchState({
      enableAllocateAdmin: action
    });
  }

  protected updateQueryParamsHandler(ctx: StateContext<any>, action: any) {
    ctx.patchState({
      queryParams: action
    });
  }

  protected toggleCheckboxHandler(ctx: StateContext<any>, action: any) {
    const stateItems: any[] = ctx.getState().items;
    const currentCheckboxValue: boolean = stateItems.filter(
      (item) => item.gmcReferenceNumber === action.gmcReferenceNumber
    )[0].checked;

    ctx.setState(
      patch({
        items: updateItem(
          (item: any) => item.gmcReferenceNumber === action.gmcReferenceNumber,
          patch({ checked: !currentCheckboxValue })
        )
      })
    );

    this.someCheckedHandler(ctx);
  }

  protected someCheckedHandler(ctx: StateContext<any>) {
    const stateItems: any[] = ctx.getState().items;
    const checkedItems: any[] = stateItems.filter((i) => i.checked);
    const someChecked: boolean =
      !!checkedItems.length && checkedItems.length !== stateItems.length;
    const allChecked: boolean =
      !!checkedItems.length && checkedItems.length === stateItems.length;

    ctx.patchState({ allChecked, someChecked });
  }

  protected toggleAllCheckboxesHandler(ctx: StateContext<any>) {
    const state: any = ctx.getState();
    const allChecked: boolean = !state.allChecked;

    ctx.patchState({ allChecked });

    state.items.forEach((i) => {
      ctx.setState(
        patch({
          items: updateItem(
            (item: any) =>
              item === i &&
              !(
                i.programmeMembershipType === "Military" ||
                i.programmeName?.includes("Foundation")
              ),
            patch({ checked: allChecked })
          )
        })
      );
    });

    this.someCheckedHandler(ctx);
  }
}
