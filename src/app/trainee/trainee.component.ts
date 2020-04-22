import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-trainee",
  templateUrl: "./trainee.component.html"
})
export class TraineeComponent implements OnInit {
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
