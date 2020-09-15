import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment";
import { Action, State, StateContext } from "@ngxs/store";
import { catchError, finalize, map, switchMap, take } from "rxjs/operators";
import { ConcernStatus } from "../../concern/concern.interfaces";
import { RecommendationStatus } from "../../recommendation/recommendation-history.interface";
import { DEFAULT_SORT } from "../../records/constants";
import { RecordsService } from "../../records/services/records.service";
import {
  defaultRecordsState,
  RecordsState,
  RecordsStateModel
} from "../../records/state/records.state";
import { IConcern, IGetConcernsResponse } from "../concerns.interfaces";
import { ConcernsService } from "../services/concerns.service";
import {
  ClearConcernsSearch,
  EnableConcernsAllocateAdmin,
  FilterConcerns,
  GetConcerns,
  GetConcernsError,
  GetConcernsSuccess,
  PaginateConcerns,
  ResetConcernsFilter,
  ResetConcernsPaginator,
  ResetConcernsSort,
  ConcernsSearch,
  SortConcerns,
  ToggleAllConcernsCheckboxes,
  ToggleConcernsCheckbox,
  SelectConcernsColumnFilters,
  ResetConcernsColumnFilters
} from "./concerns.actions";

export class ConcernsStateModel extends RecordsStateModel<
  ConcernStatus,
  IConcern[]
> {
  public filter: ConcernStatus;
}

@State<ConcernsStateModel>({
  name: "concerns",
  defaults: {
    filter: ConcernStatus.OPEN,
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

  @Action(ResetConcernsColumnFilters)
  resetFilters(ctx: StateContext<ConcernsStateModel>) {
    return super.resetFiltersHandler(ctx);
  }

  @Action(SelectConcernsColumnFilters)
  selectFilter(
    ctx: StateContext<ConcernsStateModel>,
    action: SelectConcernsColumnFilters
  ) {
    return super.selectFilterHandler(ctx, action);
  }

  @Action(GetConcerns)
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
          ctx.dispatch(new GetConcernsSuccess(response))
        ),
        catchError((error: string) =>
          ctx.dispatch(new GetConcernsError(error))
        ),
        finalize(() =>
          ctx.patchState({
            loading: false
          })
        )
      )
      .subscribe();
  }

  @Action(GetConcernsSuccess)
  getSuccess(
    ctx: StateContext<ConcernsStateModel>,
    action: GetConcernsSuccess
  ) {
    return super.getSuccessHandler(ctx, action, "concernTrainees");
  }

  @Action(GetConcernsError)
  getError(ctx: StateContext<ConcernsStateModel>, action: GetConcernsError) {
    return super.getErrorHandler(ctx, action);
  }

  @Action(SortConcerns)
  sort(ctx: StateContext<ConcernsStateModel>, action: SortConcerns) {
    return super.sortHandler(ctx, action);
  }

  @Action(ResetConcernsSort)
  resetSort(ctx: StateContext<ConcernsStateModel>) {
    return super.resetSortHandler(ctx, DEFAULT_SORT);
  }

  @Action(PaginateConcerns)
  paginate(ctx: StateContext<ConcernsStateModel>, action: PaginateConcerns) {
    return super.paginateHandler(ctx, action);
  }

  @Action(ResetConcernsPaginator)
  resetPaginator(ctx: StateContext<ConcernsStateModel>) {
    return super.resetPaginatorHandler(ctx);
  }

  @Action(ConcernsSearch)
  search(ctx: StateContext<ConcernsStateModel>, action: ConcernsSearch) {
    return super.searchHandler(ctx, action);
  }

  @Action(ClearConcernsSearch)
  clearSearch(ctx: StateContext<ConcernsStateModel>) {
    return super.clearSearchHandler(ctx);
  }

  @Action(FilterConcerns)
  filter(ctx: StateContext<ConcernsStateModel>, action: FilterConcerns) {
    return super.filterHandler(ctx, action);
  }

  @Action(ResetConcernsFilter)
  resetFilter(ctx: StateContext<ConcernsStateModel>) {
    return super.resetFilterHandler(ctx, ConcernStatus.OPEN);
  }

  @Action(EnableConcernsAllocateAdmin)
  enableAllocateAdmin(
    ctx: StateContext<ConcernsStateModel>,
    action: EnableConcernsAllocateAdmin
  ) {
    return super.enableAllocateAdminHandler(ctx, action.enableAllocateAdmin);
  }

  @Action(ToggleConcernsCheckbox)
  toggleCheckbox(
    ctx: StateContext<ConcernsStateModel>,
    action: ToggleConcernsCheckbox
  ) {
    return super.toggleCheckboxHandler(ctx, action);
  }

  @Action(ToggleAllConcernsCheckboxes)
  toggleAllCheckboxes(ctx: StateContext<ConcernsStateModel>) {
    return super.toggleAllCheckboxesHandler(ctx);
  }
}
