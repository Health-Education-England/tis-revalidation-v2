import { Component, ViewEncapsulation } from "@angular/core";
import { TraineesService } from "../shared/trainees/trainees.service";
import { Store } from "@ngxs/store";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

@Component({
  selector: "app-concerns",
  templateUrl: "./concerns.component.html",
  styleUrls: ["./concerns.component.scss", "../shared/trainees/trainee.scss"],
  encapsulation: ViewEncapsulation.None
})
export class ConcernsComponent {
  private statename = "concerns";

  constructor(
    public traineeService: TraineesService,
    private store: Store,
    private activatedRoute: ActivatedRoute
  ) {
    this.initService();
  }
  /**
   * set service variables to be used by child components
   */
  private initService() {
    this.traineeService.loading$ = this.store.select(
      (state) => state[this.statename].loading
    );
    this.traineeService.items$ = this.store.select(
      (state) => state[this.statename].item.concernTrainees
    );
    this.traineeService.totalResults$ = this.store.select(
      (state) => state[this.statename].item.totalResults
    );

    this.traineeService.navigationLinks$ = this.store.select((state) => {
      // GET PROPER FILTER DATA COUNTS
      const countopened = state[this.statename].item.countTotal;
      const countclosed = state[this.statename].item.totalPages;
      return [
        {
          linktext: `OPEN - ${countopened}`,
          filter: { concernsStatus: "Open" }
        },
        {
          linktext: `CLOSED - ${countclosed}`,
          filter: { concernsStatus: "Closed" }
        }
      ];
    });

    this.activatedRoute.queryParams.subscribe((params) => {
      const activeColumn = params.sortColumn;
      const columnDirection = params.sortOrder;
      this.traineeService.sort$ = of({
        active: activeColumn,
        direction: columnDirection
      });
    });
  }
}
