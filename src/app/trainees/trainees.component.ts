import { Component, OnInit } from "@angular/core";
import { Select } from "@ngxs/store";
import { TraineesState } from "./state/trainees.state";
import { Observable } from "rxjs";

@Component({
  selector: "app-trainees",
  templateUrl: "./trainees.component.html"
})
export class TraineesComponent implements OnInit {
  @Select(TraineesState.countTotal) countTotal$: Observable<number>;
  @Select(TraineesState.countUnderNotice) countUnderNotice$: Observable<number>;
  navLinks: { label: string; path: string; count: Observable<number> }[];
  constructor() {}

  ngOnInit(): void {
    this.setNavLinks();
  }

  setNavLinks(): void {
    this.navLinks = [
      {
        label: "ALL DOCTORS",
        path: "/trainees",
        count: this.countTotal$ // todo: discuss with Product-owner and Omar dispatch all trainees and get count same as below
      },
      {
        label: "UNDER NOTICE",
        path: "/trainees/under-notice",
        count: this.countUnderNotice$
      }
    ];
  }
}
