import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import {
  ITrainee,
  ITraineeDataCell
} from "../../core/trainee/trainee.interfaces";
import { Select, Store } from "@ngxs/store";
import { GetUnderNoticeTrainees } from "./state/under-notice.actions";
import { UnderNoticeState } from "./state/under-notice.state";
import { MatRow } from "@angular/material/table";
import { Router } from "@angular/router";

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
      name: "doctorFirstName"
    },
    {
      label: "Last name",
      name: "doctorLastName"
    },
    {
      label: "Gmc no",
      name: "gmcReferenceNumber"
    },
    {
      label: "Sanction",
      name: "sanction"
    },
    {
      label: "Submission date",
      name: "submissionDate"
    },
    {
      label: "Under notice",
      name: "underNotice"
    },
    {
      label: "Date added",
      name: "dateAdded"
    }
  ];

  public columnLabels: string[] = this.columnData.map((i) => i.label);

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(new GetUnderNoticeTrainees());
  }

  traineeDetails(event: Event, row: ITrainee): void {
    event.stopPropagation();
    this.router.navigate(["/dashboard/trainee", row.gmcNumber]);
  }
}
