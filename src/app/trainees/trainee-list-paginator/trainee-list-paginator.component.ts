import { Component } from "@angular/core";
import { PageEvent } from "@angular/material/paginator/paginator";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { RecordsService } from "../../shared/records/services/records.service";
import { TraineesService } from "../services/trainees.service";
import { Get, Paginate } from "../state/trainees.actions";
import { TraineesState } from "../state/trainees.state";

@Component({
  selector: "app-trainee-list-paginator",
  templateUrl: "./trainee-list-paginator.component.html"
})
export class TraineeListPaginatorComponent {
  @Select(TraineesState.totalResults<number>()) totalResults$: Observable<
    number
  >;
  @Select(TraineesState.pageIndex<number>()) pageIndex$: Observable<number>;

  constructor(
    private store: Store,
    private traineeService: TraineesService,
    private recordsService: RecordsService
  ) {}

  public paginateTrainees(event: PageEvent) {
    this.store.dispatch(new Paginate(event.pageIndex));
    this.store
      .dispatch(new Get())
      .pipe(take(1))
      .subscribe(() => this.recordsService.updateRoute("trainees"));
  }
}
