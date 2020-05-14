import { HttpErrorResponse } from "@angular/common/http";
import { SortDirection } from "@angular/material/sort/sort-direction";
import { IGetTraineesResponse } from "../../core/trainee/trainee.interfaces";

export class Get {
  static readonly type = "[Trainees] Get";
}

export class GetSuccess {
  static readonly type = "[Trainees] Get Success";
  constructor(public response: IGetTraineesResponse) {}
}

export class GetError {
  static readonly type = "[Trainees] Get Error";
  constructor(public error: HttpErrorResponse) {}
}

export class Sort {
  static readonly type = "[Trainees] Sort";
  constructor(public column: string, public direction: SortDirection) {}
}

export class ResetSort {
  static readonly type = "[Trainees] Reset Sort";
}

export class AllDoctorsFilter {
  static readonly type = "[Trainees] All Doctors Filter";
}

export class UnderNoticeFilter {
  static readonly type = "[Trainees] Under Notice Filter";
}

export class Search {
  static readonly type = "[Trainees] Search";
  constructor(public searchQuery: string) {}
}

export class ClearSearch {
  static readonly type = "[Trainees] Clear Search";
}

export class Paginate {
  static readonly type = "[Trainees] Paginate";
  constructor(public pageIndex: number) {}
}

export class ResetPaginator {
  static readonly type = "[Trainees] Reset Paginator";
}
