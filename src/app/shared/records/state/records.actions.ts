import { HttpErrorResponse } from "@angular/common/http";
import { SortDirection } from "@angular/material/sort/sort-direction";

const label = `[Records]`;

export class Get {
  static readonly type = `${label} Get`;
}

export class GetSuccess<T> {
  static readonly type = `${label} Get Success`;
  constructor(public response: T) {}
}

export class GetError {
  static readonly type = `${label} Get Error`;
  constructor(public error: HttpErrorResponse) {}
}

export class Sort {
  static readonly type = `${label} Sort`;
  constructor(public column: string, public direction: SortDirection) {}
}

export class ResetSort {
  static readonly type = `${label} Reset Sort`;
}

export class Filter<T> {
  static readonly type = `${label} Filter`;
  constructor(public filter: T) {}
}

export class ResetFilter {
  static readonly type = `${label} Reset Filter`;
}

export class Search {
  static readonly type = `${label} Search`;
  constructor(public searchQuery: string) {}
}

export class ClearSearch {
  static readonly type = `${label} Clear Search`;
}

export class Paginate {
  static readonly type = `${label} Paginate`;
  constructor(public pageIndex: number) {}
}

export class ResetPaginator {
  static readonly type = `${label} Reset Paginator`;
}

export class EnableAllocateAdmin {
  static readonly type = `${label} Enable Allocate Admin`;
  constructor(public enableAllocateAdmin: boolean) {}
}

export class ToggleCheckbox {
  static readonly type = `${label} Toggle Checkbox`;
  constructor(public gmcReferenceNumber: string) {}
}

export class ToggleAllCheckboxes {
  static readonly type = `${label} Toggle All Checkboxes`;
}
