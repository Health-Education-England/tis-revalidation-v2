import { Component } from "@angular/core";
import { Sort } from "@angular/material/sort";
import { Router } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { DEFAULT_ROUTE_SORT } from "../../core/trainee/constants";
import {
  ClearTraineesFilter,
  GetTrainees,
  ResetTraineesSort
} from "../state/trainees.actions";
import { TraineesState } from "../state/trainees.state";

@Component({
  selector: "app-reset-trainee-list",
  templateUrl: "./reset-trainee-list.component.html"
})
export class ResetTraineeListComponent {
  public defaultSort: Sort = DEFAULT_ROUTE_SORT;
  @Select(TraineesState.sort) sort$: Observable<Sort>;
  constructor(private store: Store, private router: Router) {}

  public resetTraineeList(): void {
    this.store
      .dispatch([
        new ResetTraineesSort(),
        new ClearTraineesFilter(),
        new GetTrainees()
      ])
      .subscribe(() =>
        this.router.navigate(["/trainees"], {
          queryParams: this.defaultSort
        })
      );
  }
}
