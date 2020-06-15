import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { INavLink } from "../details.interfaces";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html"
})
export class NavBarComponent implements OnInit {
  public navLinks: INavLink[] = [];

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const gmcId: number = this.activatedRoute.snapshot.params.gmcId;
    this.navLinks = [
      {
        label: "Recommendation",
        path: `/recommendation/${gmcId}`
      },
      {
        label: "Concern",
        path: `/concern/${gmcId}`
      },
      {
        label: "Connection",
        path: `/connection/${gmcId}`
      }
    ];
  }
}
