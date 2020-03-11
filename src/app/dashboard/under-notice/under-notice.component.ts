import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ITrainee } from "../../core/trainee/trainee.interfaces";
import { Select, Store } from "@ngxs/store";
import { GetUnderNoticeTrainees } from "./state/under-notice.actions";
import { UnderNoticeState } from "./state/under-notice.state";

@Component({
  selector: "app-under-notice",
  templateUrl: "./under-notice.component.html"
})
export class UnderNoticeComponent implements OnInit {
  @Select(UnderNoticeState.loading) loading$: Observable<boolean>;
  @Select(UnderNoticeState.underNoticeTrainees) trainees$: Observable<
    ITrainee[]
  >;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new GetUnderNoticeTrainees());
  }
}
