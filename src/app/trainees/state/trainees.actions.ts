import { HttpErrorResponse } from "@angular/common/http";
import { SortDirection } from "@angular/material/sort/sort-direction";
import { IGetTraineesResponse } from "../../core/trainee/trainee.interfaces";

export class GetTrainees {
  static readonly type = "[Trainees] Get";
}

export class GetTraineesSuccess {
  static readonly type = "[Trainees] Get Success";
  constructor(public response: IGetTraineesResponse) {}
}

export class GetTraineesError {
  static readonly type = "[Trainees] Get Error";
  constructor(public error: HttpErrorResponse) {}
}

export class SortTrainees {
  static readonly type = "[Trainees] Sort";
  constructor(public column: string, public direction: SortDirection) {}
}

export class ResetTraineesSort {
  static readonly type = "[Trainees] Reset Sort";
}

export class AllDoctorsFilter {
  static readonly type = "[Trainees] All Doctors Filter";
}

export class UnderNoticeFilter {
  static readonly type = "[Trainees] Under Notice Filter";
}

export class SearchTrainees {
  static readonly type = "[Trainees] Search";
  constructor(public searchQuery: string) {}
}

export class ClearTraineesSearch {
  static readonly type = "[Trainees] Clear Search";
}

export class PaginateTrainees {
  static readonly type = "[Trainees] Page";
  constructor(public pageIndex: number) {}
}

export class ResetTraineesPaginator {
  static readonly type = "[Trainees] Reset Paginator";
}
