import {
  EnableAllocateAdminPayload,
  FilterPayload,
  GetSuccessPayload,
  PaginatePayload,
  SearchPayload,
  SortPayload,
  ToggleCheckboxPayload
} from "../../records/state/records.actions";
import { HttpErrorPayload } from "../../shared/services/error/error.service";
import {
  ConnectionsFilterType,
  IGetConnectionsResponse
} from "../connections.interfaces";

export class GetConnections {
  static readonly type = `[Connections] Get`;
}

export class GetConnectionsSuccess extends GetSuccessPayload<
  IGetConnectionsResponse
> {
  static readonly type = `[Connections] Get Success`;
}

export class GetConnectionsError extends HttpErrorPayload {
  static readonly type = `[Connections] Get Error`;
}

export class SortConnections extends SortPayload {
  static readonly type = `[Connections] Sort`;
}

export class ResetConnectionsSort {
  static readonly type = `[Connections] Reset Sort`;
}

export class FilterConnections extends FilterPayload<ConnectionsFilterType> {
  static readonly type = `[Connections] Filter`;
}

export class ResetConnectionsFilter {
  static readonly type = `[Connections] Reset Filter`;
}

export class ConnectionsSearch extends SearchPayload {
  static readonly type = `[Connections] Search`;
}

export class ClearConnectionsSearch {
  static readonly type = `[Connections] Clear Search`;
}

export class PaginateConnections extends PaginatePayload {
  static readonly type = `[Connections] Paginate`;
}

export class ResetConnectionsPaginator {
  static readonly type = `[Connections] Reset Paginator`;
}

export class EnableConnectionsAllocateAdmin extends EnableAllocateAdminPayload {
  static readonly type = `[Connections] Enable Allocate Admin`;
}

export class ToggleConnectionsCheckbox extends ToggleCheckboxPayload {
  static readonly type = `[Connections] Toggle Checkbox`;
}

export class ToggleAllConnectionsCheckboxes {
  static readonly type = `[Connections] Toggle All Checkboxes`;
}
