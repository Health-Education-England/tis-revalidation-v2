import { Component } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { TraineesFilterType } from "../../core/trainee/trainee.interfaces";
import { TraineeService } from "../../core/trainee/trainee.service";
import {
  UnderNoticeFilter,
  ClearSearch,
  Get,
  ResetPaginator,
  ResetSort,
  AllDoctorsFilter
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

  constructor(private store: Store, private traineeService: TraineeService) {}

  public filterByAllDoctors(): void {
    this.store.dispatch(new AllDoctorsFilter());
    this.getTrainees();
  }

  public filterByUnderNotice(): void {
    this.store.dispatch(new UnderNoticeFilter());
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
