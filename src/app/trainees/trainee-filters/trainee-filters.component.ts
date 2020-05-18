import { Component } from "@angular/core";
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
  selector: "app-trainee-filters",
  templateUrl: "./trainee-filters.component.html"
})
export class TraineeFiltersComponent {
  @Select(TraineesState.countTotal) countTotal$: Observable<number>;
  @Select(TraineesState.countUnderNotice) countUnderNotice$: Observable<number>;
  @Select(TraineesState.filter) filter$: Observable<TraineesFilterType>;
  public traineesFilterType = TraineesFilterType;

  constructor(private store: Store, private traineeService: TraineesService) {}

  public filterByAllDoctors(): void {
    this.store.dispatch(new Filter(TraineesFilterType.ALL_DOCTORS));
    this.getTrainees();
  }

  public filterByUnderNotice(): void {
    this.store.dispatch(new Filter(TraineesFilterType.UNDER_NOTICE));
    this.getTrainees();
  }

  public getTrainees(): void {
    this.store.dispatch(new ResetSort());
    this.store.dispatch(new ResetPaginator());
    this.store.dispatch(new ClearSearch());
    this.store
      .dispatch(new Get())
      .pipe(take(1))
      .subscribe(() => this.traineeService.updateTraineesRoute());
  }
}
