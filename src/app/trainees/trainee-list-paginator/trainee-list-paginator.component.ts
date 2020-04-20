import { Component } from "@angular/core";
import { PageEvent } from "@angular/material/paginator/paginator";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { TraineeService } from "../../core/trainee/trainee.service";
import { GetTrainees, PaginateTrainees } from "../state/trainees.actions";
import { TraineesState } from "../state/trainees.state";

@Component({
  selector: "app-trainee-list-paginator",
  templateUrl: "./trainee-list-paginator.component.html"
})
export class TraineeListPaginatorComponent {
  @Select(TraineesState.totalResults) totalResults$: Observable<number>;
  @Select(TraineesState.pageIndex) pageIndex$: Observable<number>;

  constructor(private store: Store, private traineeService: TraineeService) {}

  public paginateTrainees(event: PageEvent) {
    this.store.dispatch(new PaginateTrainees(event.pageIndex));
    this.store
      .dispatch(new GetTrainees())
      .pipe(take(1))
      .subscribe(() => this.traineeService.updateTraineesRoute());
  }
}
