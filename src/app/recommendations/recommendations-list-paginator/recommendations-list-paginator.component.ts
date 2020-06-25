import { Component } from "@angular/core";
import { PageEvent } from "@angular/material/paginator/paginator";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { RecordsService } from "../../shared/records/services/records.service";
import { Paginate } from "../state/recommendations.actions";
import { RecommendationsState } from "../state/recommendations.state";

@Component({
  selector: "app-recommendations-list-paginator",
  templateUrl: "./recommendations-list-paginator.component.html"
})
export class RecommendationsListPaginatorComponent {
  @Select(RecommendationsState.totalResults<number>())
  public totalResults$: Observable<number>;
  @Select(RecommendationsState.pageIndex<number>())
  public pageIndex$: Observable<number>;

  constructor(private store: Store, private recordsService: RecordsService) {}

  /**
   * Leverage angular materials paginator
   * And dispatch event to store to update pageIndex
   * Then update route with new query param values
   * @param event PageEvent
   */
  public paginate(event: PageEvent): void {
    this.store
      .dispatch(new Paginate(Number(event.pageIndex)))
      .pipe(take(1))
      .subscribe(() => this.recordsService.updateRoute());
  }
}
