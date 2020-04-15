import { SortDirection } from "@angular/material/sort/sort-direction";

export class GetTrainees {
  static readonly type = "[Trainees] Get";
}

export class SortTrainees {
  static readonly type = "[Trainees] Sort";
  constructor(public column: string, public direction: SortDirection) {}
}

export class ResetTraineesSort {
  static readonly type = "[Trainees] Reset Sort";
}

export class FilterTrainees {
  static readonly type = "[Trainees] Filter";
  constructor(public filter: string) {}
}

export class ClearTraineesFilter {
  static readonly type = "[Trainees] Clear Filter";
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

export class UpdateTraineesRoute {
  static readonly type = "[Trainees] Update Route";
}

export class ResetTraineesPaginator {
  static readonly type = "[Trainees] Reset Paginator";
}
