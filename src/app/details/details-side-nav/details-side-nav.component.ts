import { Component } from "@angular/core";

import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { Breakpoints, BreakpointObserver } from "@angular/cdk/layout";
import { map, shareReplay } from "rxjs/operators";
import { environment } from "@environment";
import { IDetailsSideNav } from "./details-side-nav.interfaces";
import { DetailsSideNavState } from "./state/details-side-nav.state";

@Component({
  selector: "app-details-side-nav",
  templateUrl: "./details-side-nav.component.html",
  styleUrls: ["./details-side-nav.component.scss"]
})
export class DetailsSideNavComponent {
  @Select(DetailsSideNavState.traineeDetails)
  traineeDetails$: Observable<IDetailsSideNav>;
  hostURI: string = environment.adminsUIHostUri;
  dateFormat = environment.dateFormat;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  sideLinks = [];
  constructor(private breakpointObserver: BreakpointObserver) {
    this.traineeDetails$.subscribe((traineeDetails) => {
      const path = `${this.hostURI}admin/people/person/${traineeDetails.tisPersonId}`;
      this.sideLinks = [
        {
          link: `${path}/edit-programme`,
          text: "Programme history"
        },
        {
          link: `${path}/assessments-search`,
          text: "Assessment history"
        },
        {
          link: `${path}/edit-placements`,
          text: "Placements"
        },
        {
          link: `${path}/forms`,
          text: "Form R"
        }
      ];
    });
  }
}
