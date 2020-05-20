import { Component } from "@angular/core";
import { Sort as ISort } from "@angular/material/sort/sort";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { TraineesFilterType } from "../trainees.interfaces";
import { TraineesService } from "../services/trainees.service";
import {
  Filter,
  ClearSearch,
  Get,
  ResetPaginator,
  ResetSort
} from "../state/trainees.actions";
import { TraineesState } from "../state/trainees.state";

@Component({
  selector: "app-reset-trainee-list",
  templateUrl: "./reset-trainee-list.component.html"
})
export class ResetTraineeListComponent {
  @Select(TraineesState.sort<ISort>()) sort$: Observable<ISort>;
  @Select(TraineesState.pageIndex<number>()) pageIndex$: Observable<number>;

  constructor(private store: Store, private traineeService: TraineesService) {}

  public resetTraineeList(): void {
    this.traineeService.resetSearchForm$.next(true);
    this.store.dispatch(new Filter(TraineesFilterType.UNDER_NOTICE));
    this.store.dispatch(new ResetSort());
    this.store.dispatch(new ResetPaginator());
    this.store.dispatch(new ClearSearch());
    this.store
      .dispatch(new Get())
      .pipe(take(1))
      .subscribe(() => this.traineeService.updateTraineesRoute());
  }
}
