import { ConcernStatus } from "../../concern/concern.interfaces";
import {
  EnableAllocateAdminPayload,
  FilterPayload,
  GetErrorPayload,
  GetSuccessPayload,
  PaginatePayload,
  SearchPayload,
  SortPayload,
  ToggleCheckboxPayload
} from "../../shared/records/state/records.actions";
import { IGetConcernsResponse } from "../concerns.interfaces";

export class GetConcerns {
  static readonly type = `[Concerns] Get`;
}

export class GetConcernsSuccess extends GetSuccessPayload<
  IGetConcernsResponse
> {
  static readonly type = `[Concerns] Get Success`;
}

export class GetConcernsError extends GetErrorPayload {
  static readonly type = `[Concerns] Get Error`;
}

export class SortConcerns extends SortPayload {
  static readonly type = `[Concerns] Sort`;
}

export class ResetConcernsSort {
  static readonly type = `[Concerns] Reset Sort`;
}

export class FilterConcerns extends FilterPayload<ConcernStatus> {
  static readonly type = `[Concerns] Filter`;
}

export class ResetConcernsFilter {
  static readonly type = `[Concerns] Reset Filter`;
}

export class ConcernsSearch extends SearchPayload {
  static readonly type = `[Concerns] Search`;
}

export class ClearConcernsSearch {
  static readonly type = `[Concerns] Clear Search`;
}

export class PaginateConcerns extends PaginatePayload {
  static readonly type = `[Concerns] Paginate`;
}

export class ResetConcernsPaginator {
  static readonly type = `[Concerns] Reset Paginator`;
}

export class EnableConcernsAllocateAdmin extends EnableAllocateAdminPayload {
  static readonly type = `[Concerns] Enable Allocate Admin`;
}

export class ToggleConcernsCheckbox extends ToggleCheckboxPayload {
  static readonly type = `[Concerns] Toggle Checkbox`;
}

export class ToggleAllConcernsCheckboxes {
  static readonly type = `[Concerns] Toggle All Checkboxes`;
}
