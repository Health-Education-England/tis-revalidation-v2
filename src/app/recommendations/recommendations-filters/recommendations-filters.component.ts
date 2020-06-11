import { Component } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { RecordsService } from "../../shared/records/services/records.service";
import { RecommendationsFilterType } from "../recommendations.interfaces";
import {
  Filter,
  ClearSearch,
  Get,
  ResetPaginator,
  ResetSort
} from "../state/recommendations.actions";
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
  filter$: Observable<RecommendationsFilterType>;
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
    this.store.dispatch(new ResetSort());
    this.store.dispatch(new ResetPaginator());
    this.store.dispatch(new ClearSearch());
    this.store
      .dispatch(new Get())
      .pipe(take(1))
      .subscribe(() => this.recordsService.updateRoute());
  }
}
