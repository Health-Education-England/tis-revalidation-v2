import { Component } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { RecordsService } from "../../shared/records/services/records.service";
import { Filter } from "../../shared/records/state/records.actions";
import { RecommendationsFilterType } from "../recommendations.interfaces";
import { RecommendationsState } from "../state/recommendations.state";

@Component({
  selector: "app-recommendations-filters",
  templateUrl: "./recommendations-filters.component.html"
})
export class RecommendationsFiltersComponent {
  @Select(RecommendationsState.countTotal) countTotal$: Observable<number>;
  @Select(RecommendationsState.countUnderNotice) countUnderNotice$: Observable<
    number
  >;
  @Select(RecommendationsState.filter<RecommendationsFilterType>())
  public filter$: Observable<RecommendationsFilterType>;
  public enableAllocateAdmin$: Observable<boolean> = this.store.select(
    (state) => state[this.recordsService.stateName].enableAllocateAdmin
  );
  public allDoctors: RecommendationsFilterType =
    RecommendationsFilterType.ALL_DOCTORS;
  public underNotice: RecommendationsFilterType =
    RecommendationsFilterType.UNDER_NOTICE;

  constructor(private store: Store, private recordsService: RecordsService) {}

  public filterByAllDoctors(): void {
    this.store.dispatch(new Filter(this.allDoctors));
    this.getRecommendations();
  }

  public filterByUnderNotice(): void {
    this.store.dispatch(new Filter(this.underNotice));
    this.getRecommendations();
  }

  public getRecommendations(): void {
    this.recordsService
      .resetSortPageAndSearch()
      .pipe(take(1))
      .subscribe(() => this.recordsService.updateRoute());
  }
}
