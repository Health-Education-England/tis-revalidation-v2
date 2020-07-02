import { HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment";
import { Action, State, StateContext } from "@ngxs/store";
import { catchError, finalize, switchMap, take } from "rxjs/operators";
import { RecordsService } from "../../shared/records/services/records.service";
import {
  defaultRecordsState,
  RecordsState,
  RecordsStateModel
} from "../../shared/records/state/records.state";
import {
  ConnectionsFilterType,
  IConnection,
  IGetConnectionsResponse
} from "../connections.interfaces";
import { DEFAULT_SORT } from "../../shared/records/constants";
import { ConnectionsService } from "../services/connections.service";
import {
  ClearSearch,
  EnableAllocateAdmin,
  Filter,
  Paginate,
  ResetPaginator,
  ResetSort,
  Search,
  Sort,
  Get,
  GetError,
  GetSuccess,
  ResetFilter
} from "./connections.actions";

export class ConnectionsStateModel extends RecordsStateModel<
  ConnectionsFilterType,
  IConnection[]
> {
  public filter: ConnectionsFilterType;
}

@State<ConnectionsStateModel>({
  name: "connections",
  defaults: {
    filter: ConnectionsFilterType.ALL,
    ...defaultRecordsState
  }
})
@Injectable()
export class ConnectionsState extends RecordsState {
  constructor(
    private connectionsService: ConnectionsService,
    protected recordsService: RecordsService
  ) {
    super(recordsService);
  }

  @Action(Get)
  get(ctx: StateContext<ConnectionsStateModel>) {
    const params: HttpParams = this.connectionsService.generateParams();
    const endPoint = `${environment.appUrls.getConnections}`;
    super.getHandler(ctx);

    return this.recordsService
      .getRecords(endPoint, params)
      .pipe(
        take(1),
        switchMap((response: IGetConnectionsResponse) =>
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
  getSuccess(ctx: StateContext<ConnectionsStateModel>, action: GetSuccess) {
    return super.getSuccessHandler(ctx, action, "connectionsInfo");
  }

  @Action(GetError)
  getError(ctx: StateContext<ConnectionsStateModel>, action: GetError) {
    return super.getErrorHandler(ctx, action);
  }

  @Action(Sort)
  sort(ctx: StateContext<ConnectionsStateModel>, action: Sort) {
    return super.sortHandler(ctx, action);
  }

  @Action(ResetSort)
  resetSort(ctx: StateContext<ConnectionsStateModel>) {
    return super.resetSortHandler(ctx, DEFAULT_SORT);
  }

  @Action(Paginate)
  paginate(ctx: StateContext<ConnectionsStateModel>, action: Paginate) {
    return super.paginateHandler(ctx, action);
  }

  @Action(ResetPaginator)
  resetPaginator(ctx: StateContext<ConnectionsStateModel>) {
    return super.resetPaginatorHandler(ctx);
  }

  @Action(Search)
  search(ctx: StateContext<ConnectionsStateModel>, action: Search) {
    return super.searchHandler(ctx, action);
  }

  @Action(ClearSearch)
  clearSearch(ctx: StateContext<ConnectionsStateModel>) {
    return super.clearSearchHandler(ctx);
  }

  @Action(Filter)
  filter(ctx: StateContext<ConnectionsStateModel>, action: Filter) {
    return super.filterHandler(ctx, action);
  }

  @Action(ResetFilter)
  resetFilter(ctx: StateContext<ConnectionsStateModel>) {
    return super.resetFilterHandler(ctx, ConnectionsFilterType.ALL);
  }

  @Action(EnableAllocateAdmin)
  enableAllocateAdmin(
    ctx: StateContext<ConnectionsStateModel>,
    action: EnableAllocateAdmin
  ) {
    return super.enableAllocateAdminHandler(ctx, action.enableAllocateAdmin);
  }
}
