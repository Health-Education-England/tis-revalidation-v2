import {
  FilterPayload,
  GetErrorPayload,
  GetSuccessPayload,
  PaginatePayload,
  SearchPayload,
  SortPayload
} from "../../shared/records/state/records.actions";
import {
  ConnectionsFilterType,
  IGetConnectionsResponse
} from "../connections.interfaces";

const label = `[Connections]`;

export class Get {
  static readonly type = `${label} Get`;
}

export class GetSuccess extends GetSuccessPayload<IGetConnectionsResponse> {
  static readonly type = `${label} Get Success`;
}

export class GetError extends GetErrorPayload {
  static readonly type = `${label} Get Error`;
}

export class Sort extends SortPayload {
  static readonly type = `${label} Sort`;
}

export class ResetSort {
  static readonly type = `${label} Reset Sort`;
}

export class Filter extends FilterPayload<ConnectionsFilterType> {
  static readonly type = `${label} Filter`;
}

export class Search extends SearchPayload {
  static readonly type = `${label} Search`;
}

export class ClearSearch {
  static readonly type = `${label} Clear Search`;
}

export class Paginate extends PaginatePayload {
  static readonly type = `${label} Paginate`;
}

export class ResetPaginator {
  static readonly type = `${label} Reset Paginator`;
}
