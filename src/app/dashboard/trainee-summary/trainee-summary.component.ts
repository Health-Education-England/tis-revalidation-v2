import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-trainee-summary",
  templateUrl: "./trainee-summary.component.html",
  styleUrls: ["./trainee-summary.component.scss"]
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
