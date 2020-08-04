import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment";
import { Action, State, StateContext } from "@ngxs/store";
import { catchError, finalize, switchMap, take } from "rxjs/operators";
import { RecordsService } from "../../records/services/records.service";
import {
  defaultRecordsState,
  RecordsState,
  RecordsStateModel
} from "../../records/state/records.state";
import {
  ConnectionsFilterType,
  IConnection,
  IGetConnectionsResponse
} from "../connections.interfaces";
import { DEFAULT_SORT } from "../../records/constants";
import { ConnectionsService } from "../services/connections.service";
import {
  ClearConnectionsSearch,
  EnableConnectionsAllocateAdmin,
  FilterConnections,
  PaginateConnections,
  ResetConnectionsPaginator,
  ResetConnectionsSort,
  ConnectionsSearch,
  SortConnections,
  GetConnections,
  GetConnectionsError,
  GetConnectionsSuccess,
  ResetConnectionsFilter,
  ToggleAllConnectionsCheckboxes,
  ToggleConnectionsCheckbox
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

  @Action(GetConnections)
  get(ctx: StateContext<ConnectionsStateModel>) {
    const params: HttpParams = this.connectionsService.generateParams();
    const endPoint = `${environment.appUrls.getConnections}`;
    super.getHandler(ctx);

    return this.recordsService
      .getRecords(endPoint, params)
      .pipe(
        take(1),
        switchMap((response: IGetConnectionsResponse) =>
          ctx.dispatch(new GetConnectionsSuccess(response))
        ),
        catchError((error: string) =>
          ctx.dispatch(new GetConnectionsError(error))
        ),
        finalize(() =>
          ctx.patchState({
            loading: false
          })
        )
      )
      .subscribe();
  }

  @Action(GetConnectionsSuccess)
  getSuccess(
    ctx: StateContext<ConnectionsStateModel>,
    action: GetConnectionsSuccess
  ) {
    return super.getSuccessHandler(ctx, action, "connections");
  }

  @Action(GetConnectionsError)
  getError(
    ctx: StateContext<ConnectionsStateModel>,
    action: GetConnectionsError
  ) {
    return super.getErrorHandler(ctx, action);
  }

  @Action(SortConnections)
  sort(ctx: StateContext<ConnectionsStateModel>, action: SortConnections) {
    return super.sortHandler(ctx, action);
  }

  @Action(ResetConnectionsSort)
  resetSort(ctx: StateContext<ConnectionsStateModel>) {
    return super.resetSortHandler(ctx, DEFAULT_SORT);
  }

  @Action(PaginateConnections)
  paginate(
    ctx: StateContext<ConnectionsStateModel>,
    action: PaginateConnections
  ) {
    return super.paginateHandler(ctx, action);
  }

  @Action(ResetConnectionsPaginator)
  resetPaginator(ctx: StateContext<ConnectionsStateModel>) {
    return super.resetPaginatorHandler(ctx);
  }

  @Action(ConnectionsSearch)
  search(ctx: StateContext<ConnectionsStateModel>, action: ConnectionsSearch) {
    return super.searchHandler(ctx, action);
  }

  @Action(ClearConnectionsSearch)
  clearSearch(ctx: StateContext<ConnectionsStateModel>) {
    return super.clearSearchHandler(ctx);
  }

  @Action(FilterConnections)
  filter(ctx: StateContext<ConnectionsStateModel>, action: FilterConnections) {
    return super.filterHandler(ctx, action);
  }

  @Action(ResetConnectionsFilter)
  resetFilter(ctx: StateContext<ConnectionsStateModel>) {
    return super.resetFilterHandler(ctx, ConnectionsFilterType.ALL);
  }

  @Action(EnableConnectionsAllocateAdmin)
  enableAllocateAdmin(
    ctx: StateContext<ConnectionsStateModel>,
    action: EnableConnectionsAllocateAdmin
  ) {
    return super.enableAllocateAdminHandler(ctx, action.enableAllocateAdmin);
  }

  @Action(ToggleConnectionsCheckbox)
  toggleCheckbox(
    ctx: StateContext<ConnectionsStateModel>,
    action: ToggleConnectionsCheckbox
  ) {
    return super.toggleCheckboxHandler(ctx, action);
  }

  @Action(ToggleAllConnectionsCheckboxes)
  toggleAllCheckboxes(ctx: StateContext<ConnectionsStateModel>) {
    return super.toggleAllCheckboxesHandler(ctx);
  }
}
