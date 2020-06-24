import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { TraineesService } from "../shared/trainees/trainees.service";
import { Store } from "@ngxs/store";
import { ActivatedRoute } from "@angular/router";
import { of, Observable } from "rxjs";

@Component({
  selector: "app-recommendations",
  templateUrl: "./recommendations.component.html",
  styleUrls: [
    "./recommendations.component.scss",
    "../shared/trainees/trainee.scss"
  ],
  encapsulation: ViewEncapsulation.None
})
export class RecommendationsComponent {
  private statename = "recommendations";

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
      (state) => state[this.statename].item.traineeInfo
    );
    this.traineeService.totalResults$ = this.store.select(
      (state) => state[this.statename].item.totalResults
    );

    this.traineeService.navigationLinks$ = this.store.select((state) => {
      const countalldoctors = state[this.statename].item.countTotal;
      const countundernotice = state[this.statename].item.countUnderNotice;
      return [
        {
          linktext: `ALL DOCTORS - ${countalldoctors}`,
          filter: { underNotice: null, allDoctors: true }
        },
        {
          linktext: `UNDER NOTICE - ${countundernotice}`,
          filter: { underNotice: true, allDoctors: null }
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
