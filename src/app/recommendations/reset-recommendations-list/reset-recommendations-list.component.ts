import { Component } from "@angular/core";
import { Sort as ISort } from "@angular/material/sort/sort";
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
  selector: "app-reset-recommendations-list",
  templateUrl: "./reset-recommendations-list.component.html"
})
export class ResetRecommendationsListComponent {
  @Select(RecommendationsState.sort<ISort>()) sort$: Observable<ISort>;
  @Select(RecommendationsState.pageIndex<number>()) pageIndex$: Observable<
    number
  >;

  constructor(private store: Store, private recordsService: RecordsService) {}

  public resetRecommendationsList(): void {
    this.recordsService.resetSearchForm$.next(true);
    this.store.dispatch(new Filter(RecommendationsFilterType.UNDER_NOTICE));
    this.store.dispatch(new ResetSort());
    this.store.dispatch(new ResetPaginator());
    this.store.dispatch(new ClearSearch());
    this.store
      .dispatch(new Get())
      .pipe(take(1))
      .subscribe(() => this.recordsService.updateRoute());
  }
}
