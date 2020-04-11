import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-trainee-summary",
  templateUrl: "./trainee-summary.component.html"
})
export class TraineeSummaryComponent implements OnInit {
  navLinks = [
    {
      label: "Recommendation",
      path: "./"
    },
    {
      label: "Concerns",
      path: ""
    },
    {
      label: "Connections",
      path: ""
    }
  ];
  constructor() {}

  ngOnInit(): void {}
}
