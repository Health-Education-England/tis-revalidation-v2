import { Component, OnInit } from "@angular/core";
import { Select } from "@ngxs/store";
import { RecommendationHistoryState } from "../state/recommendation-history.state";
import { Observable } from "rxjs";
import { IRecommendationHistory } from "../recommendation-history.interface";
import { Breakpoints, BreakpointObserver } from "@angular/cdk/layout";
import { map, shareReplay } from "rxjs/operators";
import { environment } from "@environment";

@Component({
  selector: "app-recommendation-details",
  templateUrl: "./recommendation-details.component.html",
  styleUrls: ["./recommendation-details.component.scss"]
})
export class RecommendationDetailsComponent implements OnInit {
  @Select(RecommendationHistoryState.recommendationHistory)
  recommendationHistory$: Observable<IRecommendationHistory>;

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
  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {}
}
