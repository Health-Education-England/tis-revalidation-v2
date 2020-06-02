import { Component } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { RecordsService } from "../../shared/records/services/records.service";
import { TraineesFilterType } from "../trainees.interfaces";
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
  @Select(TraineesState.filter<TraineesFilterType>()) filter$: Observable<
    TraineesFilterType
  >;
  public allDoctors: TraineesFilterType = TraineesFilterType.ALL_DOCTORS;
  public underNotice: TraineesFilterType = TraineesFilterType.UNDER_NOTICE;

  constructor(private store: Store, private recordsService: RecordsService) {}

  public filterByAllDoctors(): void {
    this.store.dispatch(new Filter(this.allDoctors));
    this.getTrainees();
  }

  public filterByUnderNotice(): void {
    this.store.dispatch(new Filter(this.underNotice));
    this.getTrainees();
  }

  public getTrainees(): void {
    this.store.dispatch(new ResetSort());
    this.store.dispatch(new ResetPaginator());
    this.store.dispatch(new ClearSearch());
    this.store
      .dispatch(new Get())
      .pipe(take(1))
      .subscribe(() => this.recordsService.updateRoute());
  }
}
