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
    const gmcNumber: number = this.activatedRoute.snapshot.params.gmcNumber;
    this.navLinks = [
      {
        label: "Recommendation",
        path: `/recommendation/${gmcNumber}`
      }
    ];
  }
}
