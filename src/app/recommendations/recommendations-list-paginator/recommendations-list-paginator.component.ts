import { Component } from "@angular/core";
import { PageEvent } from "@angular/material/paginator/paginator";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { RecordsService } from "../../shared/records/services/records.service";
import { RecommendationsService } from "../services/recommendations.service";
import { Get, Paginate } from "../state/recommendations.actions";
import { RecommendationsState } from "../state/recommendations.state";

@Component({
  selector: "app-recommendations-list-paginator",
  templateUrl: "./recommendations-list-paginator.component.html"
})
export class RecommendationsListPaginatorComponent {
  @Select(RecommendationsState.totalResults<number>())
  totalResults$: Observable<number>;
  @Select(RecommendationsState.pageIndex<number>()) pageIndex$: Observable<
    number
  >;

  constructor(
    private store: Store,
    private recommendationsService: RecommendationsService,
    private recordsService: RecordsService
  ) {}

  public paginate(event: PageEvent) {
    this.store.dispatch(new Paginate(event.pageIndex));
    this.store
      .dispatch(new Get())
      .pipe(take(1))
      .subscribe(() => this.recordsService.updateRoute());
  }
}
