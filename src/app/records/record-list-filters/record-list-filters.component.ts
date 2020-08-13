import { Component } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { RecordsService } from "../services/records.service";
import { RecommendationsFilterType } from "../../recommendations/recommendations.interfaces";
import { RecommendationsState } from "../../recommendations/state/recommendations.state";

@Component({
  selector: "app-record-list-filters",
  templateUrl: "./record-list-filters.component.html"
})
export class RecordListFiltersComponent {
  @Select(RecommendationsState.countTotal) countTotal$: Observable<number>;
  @Select(RecommendationsState.countUnderNotice) countUnderNotice$: Observable<
    number
  >;
  public filter$: Observable<string> = this.store.select(
    (state) => state[this.recordsService.stateName].filter
  );
  public enableAllocateAdmin$: Observable<boolean> = this.store.select(
    (state) => state[this.recordsService.stateName].enableAllocateAdmin
  );
  public allDoctors: RecommendationsFilterType =
    RecommendationsFilterType.ALL_DOCTORS;
  public underNotice: RecommendationsFilterType =
    RecommendationsFilterType.UNDER_NOTICE;

  constructor(private store: Store, private recordsService: RecordsService) {}

  public filterRecords(filter: string): void {
    this.recordsService.filter(filter);
    this.recordsService
      .resetSortPageAndSearch()
      .pipe(take(1))
      .subscribe(() => this.recordsService.updateRoute());
  }
}
