import { Component } from "@angular/core";
import { Sort as ISort } from "@angular/material/sort/sort";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { RecordsService } from "../../shared/records/services/records.service";
import { RecommendationsState } from "../state/recommendations.state";

@Component({
  selector: "app-reset-recommendations-list",
  templateUrl: "./reset-recommendations-list.component.html"
})
export class ResetRecommendationsListComponent {
  @Select(RecommendationsState.sort<ISort>()) public sort$: Observable<ISort>;
  @Select(RecommendationsState.pageIndex<number>())
  public pageIndex$: Observable<number>;

  constructor(private store: Store, private recordsService: RecordsService) {}

  public resetRecommendationsList(): void {
    this.recordsService.resetSearchForm$.next(true);
    this.recordsService
      .resetRecordsState()
      .pipe(take(1))
      .subscribe(() => this.recordsService.updateRoute());
  }
}
