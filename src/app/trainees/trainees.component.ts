import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-trainees",
  templateUrl: "./trainees.component.html"
})
export class TraineesComponent implements OnInit {
  navLinks: { label: string; path: string; count: number }[];

  constructor() {}
  ngOnInit(): void {
    this.navLinks = [
      {
        label: "ALL DOCTORS",
        path: "/trainees",
        count: 15700 //todo: discuss with Product-owner and Omar dispatch all trainees and get count same as below
      },
      {
        label: "UNDER NOTICE",
        path: "/trainees/under-notice",
        count: 1500
      }
    ];
  }
}
