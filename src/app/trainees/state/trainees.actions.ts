import { HttpErrorResponse } from "@angular/common/http";
import { SortDirection } from "@angular/material/sort/sort-direction";
import {
  IGetTraineesResponse,
  TraineesFilterType
} from "../../core/trainee/trainee.interfaces";

const label = `[Trainees]`;

export class Get {
  static readonly type = `${label} Get`;
}

export class GetSuccess {
  static readonly type = `${label} Get Success`;
  constructor(public response: IGetTraineesResponse) {}
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

export class Filter {
  static readonly type = `${label} Filter`;
  constructor(public filter: TraineesFilterType) {}
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
