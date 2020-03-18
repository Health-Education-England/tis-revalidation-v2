import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import {
  ITrainee,
  ITraineeDataCell
} from "../../core/trainee/trainee.interfaces";
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
  public columnData: ITraineeDataCell[] = [
    {
      label: "First name",
      name: "firstName"
    },
    {
      label: "Last name",
      name: "lastName"
    },
    {
      label: "Gmc no",
      name: "gmcNumber"
    },
    {
      label: "Designated Body",
      name: "programmeMembershipType"
    },
    {
      label: "Status",
      name: "status"
    },
    {
      label: "Trainee type",
      name: "traineeType"
    },
    {
      label: "Last updated",
      name: "lastUpdated"
    }
  ];

  public columnLabels: string[] = this.columnData.map(i => i.label);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new GetUnderNoticeTrainees());
  }
}
