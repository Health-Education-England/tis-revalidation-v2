import {
  FilterPayload,
  GetErrorPayload,
  GetSuccessPayload,
  PaginatePayload,
  SearchPayload,
  SortPayload
} from "../../shared/records/state/records.actions";
import {
  IGetRecommendationsResponse,
  RecommendationsFilterType
} from "../recommendations.interfaces";

const label = `[Recommendations]`;

export class Get {
  static readonly type = `${label} Get`;
}

export class GetSuccess extends GetSuccessPayload<IGetRecommendationsResponse> {
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

export class Filter extends FilterPayload<RecommendationsFilterType> {
  static readonly type = `${label} Filter`;
}

export class ResetFilter {
  static readonly type = `${label} Reset Filter`;
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
