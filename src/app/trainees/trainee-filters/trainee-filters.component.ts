import { Component } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { TraineeService } from "../../core/trainee/trainee.service";
import {
  UnderNoticeFilter,
  ClearTraineesSearch,
  GetTrainees,
  ResetTraineesPaginator,
  ResetTraineesSort,
  AllDoctorsFilter
} from "../state/trainees.actions";
import { TraineesState } from "../state/trainees.state";

@Component({
  selector: "app-trainee-filters",
  templateUrl: "./trainee-filters.component.html",
  styleUrls: ["./trainee-filters.component.scss"]
})
export class TraineeFiltersComponent {
  @Select(TraineesState.countTotal) countTotal$: Observable<number>;
  @Select(TraineesState.countUnderNotice) countUnderNotice$: Observable<number>;
  @Select(TraineesState.underNotice) underNotice$: Observable<boolean>;

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
    this.store.dispatch(new ResetTraineesSort());
    this.store.dispatch(new ResetTraineesPaginator());
    this.store.dispatch(new ClearTraineesSearch());
    this.store
      .dispatch(new GetTrainees())
      .pipe(take(1))
      .subscribe(() => this.traineeService.updateTraineesRoute());
  }
}
