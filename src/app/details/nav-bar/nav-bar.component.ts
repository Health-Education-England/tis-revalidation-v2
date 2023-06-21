import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { INavLink } from "../details.interfaces";
import { RecordsService } from "src/app/records/services/records.service";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html"
})
export class NavBarComponent implements OnInit {
  public navLinks: INavLink[] = [];
  stateName: string = "";
  constructor(
    private activatedRoute: ActivatedRoute,
    private recordsService: RecordsService
  ) {}

  ngOnInit() {
    this.stateName = this.recordsService.stateName;
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
