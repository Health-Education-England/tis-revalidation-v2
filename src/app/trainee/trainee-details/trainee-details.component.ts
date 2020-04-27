import { Component, OnInit } from "@angular/core";
import { Select } from "@ngxs/store";
import { RevalidationHistoryState } from "../state/revalidation-history.state";
import { Observable } from "rxjs";
import { IRevalidationHistory } from "../revalidation-history.interface";
import { Breakpoints, BreakpointObserver } from "@angular/cdk/layout";
import { map, shareReplay } from "rxjs/operators";

@Component({
  selector: "app-trainee-details",
  templateUrl: "./trainee-details.component.html",
  styleUrls: ["./trainee-details.component.scss"]
})
export class TraineeDetailsComponent implements OnInit {
  @Select(RevalidationHistoryState.revalidationHistory)
  revalidationHistory$: Observable<IRevalidationHistory>;

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
