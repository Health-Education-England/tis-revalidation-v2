import { Component } from "@angular/core";
import { Sort } from "@angular/material/sort";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import {
  ClearTraineesFilter,
  ClearTraineesSearch,
  GetTrainees,
  ResetTraineesPaginator,
  ResetTraineesSort,
  UpdateTraineesRoute
} from "../state/trainees.actions";
import { TraineesState } from "../state/trainees.state";

@Component({
  selector: "app-reset-trainee-list",
  templateUrl: "./reset-trainee-list.component.html"
})
export class ResetTraineeListComponent {
  @Select(TraineesState.sort) sort$: Observable<Sort>;
  @Select(TraineesState.pageIndex) pageIndex$: Observable<number>;
  constructor(private store: Store) {}

  public resetTraineeList(): void {
    this.store.dispatch(new ResetTraineesSort());
    this.store.dispatch(new ResetTraineesPaginator());
    this.store.dispatch(new ClearTraineesFilter());
    this.store.dispatch(new ClearTraineesSearch());
    this.store
      .dispatch(new GetTrainees())
      .pipe(take(1))
      .subscribe(() => this.store.dispatch(new UpdateTraineesRoute()));
  }
}
