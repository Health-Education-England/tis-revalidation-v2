import { SortDirection } from "@angular/material/sort/sort-direction";

export class GetSuccessPayload<T> {
  constructor(public response: T) {}
}

export class SortPayload {
  constructor(public column: string, public direction: SortDirection) {}
}

export class FilterPayload<T> {
  constructor(public filter: T) {}
}

export class TableFiltersPayload<T> {
  constructor(public tableFilter: T) {}
}
export class SearchPayload {
  constructor(public searchQuery: string) {}
}

export class PaginatePayload {
  constructor(public pageIndex: number) {}
}

export class EnableAllocateAdminPayload {
  constructor(public enableAllocateAdmin: boolean) {}
}

export class ToggleCheckboxPayload {
  constructor(public gmcReferenceNumber: string) {}
}
