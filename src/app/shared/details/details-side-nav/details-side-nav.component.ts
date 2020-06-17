import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { Breakpoints, BreakpointObserver } from "@angular/cdk/layout";
import { map, shareReplay } from "rxjs/operators";
import { environment } from "@environment";
import { Get } from "./state/details-side-nav.actions";
import { DetailsSideNavState } from "./state/details-side-nav.state";
import { IRecommendationHistory } from "src/app/recommendation/recommendation-history.interface";

@Component({
  selector: "app-details-side-nav",
  templateUrl: "./details-side-nav.component.html",
  styleUrls: ["./details-side-nav.component.scss"]
})
export class DetailsSideNavComponent implements OnInit {
  @Select(DetailsSideNavState.traineeDetails)
  traineeDetails$: Observable<IRecommendationHistory>;

  dateFormat = environment.dateFormat;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  sideLinks = [
    {
      link: "",
      text: "Programme history"
    },
    {
      link: "",
      text: "Assessment history"
    },
    {
      link: "",
      text: "Placements"
    },
    {
      link: "",
      text: "Form R"
    }
  ];
  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const gmcId: number = Number(this.activatedRoute.snapshot.params.gmcId);
    this.store.dispatch(new Get(gmcId));
  }
}
