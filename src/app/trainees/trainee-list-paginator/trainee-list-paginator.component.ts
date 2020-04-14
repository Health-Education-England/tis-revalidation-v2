import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator/paginator";
import { ActivatedRoute, Params } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import {
  GetTrainees,
  PaginateTrainees,
  ResetTraineesPaginator,
  UpdateTraineesRoute
} from "../state/trainees.actions";
import { TraineesState } from "../state/trainees.state";

@Component({
  selector: "app-trainee-list-paginator",
  templateUrl: "./trainee-list-paginator.component.html"
})
export class TraineeListPaginatorComponent implements OnInit {
  @Select(TraineesState.countTotal) countTotal$: Observable<number>;
  @Select(TraineesState.pageIndex) pageIndex$: Observable<number>;

  constructor(private store: Store, private route: ActivatedRoute) {}

  /**
   * Check if pageIndex query param exists
   * Then dispatch appropriate event
   * And update store accordingly
   */
  ngOnInit(): void {
    const params: Params = this.route.snapshot.queryParams;

    if (params.pageIndex) {
      this.store.dispatch(new PaginateTrainees(params.pageIndex));
    } else {
      this.store.dispatch(new ResetTraineesPaginator());
    }
  }

  public paginateTrainees(event: PageEvent) {
    this.store.dispatch(new PaginateTrainees(event.pageIndex));
    this.store
      .dispatch(new GetTrainees())
      .pipe(take(1))
      .subscribe(() => this.store.dispatch(new UpdateTraineesRoute()));
  }
}
