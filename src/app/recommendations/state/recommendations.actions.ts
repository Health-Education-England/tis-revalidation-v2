import {
  EnableAllocateAdminPayload,
  FilterPayload,
  GetSuccessPayload,
  PaginatePayload,
  SearchPayload,
  SortPayload,
  ToggleCheckboxPayload,
  TableFiltersPayload,
  QueryParamsPayload
} from "../../records/state/records.actions";
import { HttpErrorPayload } from "../../shared/services/error/error.service";
import {
  IGetRecommendationsResponse,
  RecommendationsFilterType,
  IRecommendationsTableFilters
} from "../recommendations.interfaces";

export class GetRecommendations {
  static readonly type = `[Recommendations] Get`;
}

export class GetRecommendationsSuccess extends GetSuccessPayload<IGetRecommendationsResponse> {
  static readonly type = `[Recommendations] Get Success`;
}

export class GetRecommendationsError extends HttpErrorPayload {
  static readonly type = `[Recommendations] Get Error`;
}

export class SortRecommendations extends SortPayload {
  static readonly type = `[Recommendations] Sort`;
}

export class ResetRecommendationsSort {
  static readonly type = `[Recommendations] Reset Sort`;
}

export class FilterRecommendations extends FilterPayload<RecommendationsFilterType> {
  static readonly type = `[Recommendations] Filter`;
}

export class ResetRecommendationsFilter {
  static readonly type = `[Recommendations] Reset Filter`;
}

export class RecommendationsSearch extends SearchPayload {
  static readonly type = `[Recommendations] Search`;
}

export class ClearRecommendationsSearch {
  static readonly type = `[Recommendations] Clear Search`;
}

export class SetRecommendationsTableFilters extends TableFiltersPayload<IRecommendationsTableFilters> {
  static readonly type = `[Recommendations] Filter Table`;
}

export class ClearRecommendationsTableFilters {
  static readonly type = `[Recommendations] Clear Table Filters`;
}

export class PaginateRecommendations extends PaginatePayload {
  static readonly type = `[Recommendations] Paginate`;
}

export class ResetRecommendationsPaginator {
  static readonly type = `[Recommendations] Reset Paginator`;
}

export class EnableRecommendationsAllocateAdmin extends EnableAllocateAdminPayload {
  static readonly type = `[Recommendations] Enable Allocate Admin`;
}

export class ToggleRecommendationsCheckbox extends ToggleCheckboxPayload {
  static readonly type = `[Recommendations] Toggle Checkbox`;
}

export class ToggleAllRecommendationsCheckboxes {
  static readonly type = `[Recommendations] Toggle All Checkboxes`;
}

export class UpdateRecommendationsQueryParams extends QueryParamsPayload {
  static readonly type = "[Recommendations] Update query params";
}
