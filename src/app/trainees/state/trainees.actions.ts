import {
  FilterPayload,
  GetErrorPayload,
  GetSuccessPayload,
  PaginatePayload,
  SearchPayload,
  SortPayload
} from "../../shared/records/state/records.actions";
import {
  IGetTraineesResponse,
  TraineesFilterType
} from "../trainees.interfaces";

const label = `[Trainees]`;

export class Get {
  static readonly type = `${label} Get`;
}

export class GetSuccess extends GetSuccessPayload<IGetTraineesResponse> {
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

export class Filter extends FilterPayload<TraineesFilterType> {
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
