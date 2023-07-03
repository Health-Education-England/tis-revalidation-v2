import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { INavLink } from "../details.interfaces";
import { RecordsService } from "src/app/records/services/records.service";
import { Store } from "@ngxs/store";
@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html"
})
export class NavBarComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private recordsService: RecordsService,
    private store: Store
  ) {}

  navLinks: INavLink[] = [];
  summaryRoute: string;
  linkLabel: string;
  ngOnInit() {
    this.summaryRoute = this.recordsService.summaryRoute;
    this.linkLabel = `${this.recordsService.stateName} List`;
    const gmcNumber: number = this.activatedRoute.snapshot.params.gmcNumber;
    this.navLinks = [
      {
        label: "Recommendation",
        path: `/recommendation/${gmcNumber}`
      },
      {
        label: "Connection",
        path: `/connection/${gmcNumber}`
      }
    ];
  }
}
