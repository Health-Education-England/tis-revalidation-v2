import { Component } from "@angular/core";
import { Sort } from "@angular/material/sort";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { TraineeService } from "../../core/trainee/trainee.service";
import {
  UnderNoticeFilter,
  ClearTraineesSearch,
  GetTrainees,
  ResetTraineesPaginator,
  ResetTraineesSort
} from "../state/trainees.actions";
import { TraineesState } from "../state/trainees.state";

@Component({
  selector: "app-reset-trainee-list",
  templateUrl: "./reset-trainee-list.component.html"
})
export class ResetTraineeListComponent {
  @Select(TraineesState.sort) sort$: Observable<Sort>;
  @Select(TraineesState.pageIndex) pageIndex$: Observable<number>;

  constructor(private store: Store, private traineeService: TraineeService) {}

  public resetTraineeList(): void {
    this.traineeService.resetSearchForm$.next(true);
    this.store.dispatch(new UnderNoticeFilter());
    this.store.dispatch(new ResetTraineesSort());
    this.store.dispatch(new ResetTraineesPaginator());
    this.store.dispatch(new ClearTraineesSearch());
    this.store
      .dispatch(new GetTrainees())
      .pipe(take(1))
      .subscribe(() => this.traineeService.updateTraineesRoute());
  }
}
