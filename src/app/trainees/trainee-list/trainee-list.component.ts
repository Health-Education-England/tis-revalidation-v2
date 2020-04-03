import { Component, OnInit } from "@angular/core";
import { Sort } from "@angular/material/sort";
import { Observable } from "rxjs";
import {
  ITrainee,
  ITraineeDataCell
} from "../../core/trainee/trainee.interfaces";
import { Select, Store } from "@ngxs/store";
import { GetTrainees, SortTrainees } from "../state/trainees.actions";
import { TraineesState } from "../state/trainees.state";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-trainee-list",
  templateUrl: "./trainee-list.component.html"
})
export class TraineeListComponent implements OnInit {
  @Select(TraineesState.loading) loading$: Observable<boolean>;
  @Select(TraineesState.trainees) trainees$: Observable<ITrainee[]>;
  @Select(TraineesState.sort) sort$: Observable<Sort>;

  public columnData: ITraineeDataCell[] = [
    {
      label: "First name",
      name: "doctorFirstName",
      enableSort: true
    },
    {
      label: "Last name",
      name: "doctorLastName",
      enableSort: true
    },
    {
      label: "Gmc no",
      name: "gmcReferenceNumber",
      enableSort: false
    },
    {
      label: "GMC Submission due date",
      name: "submissionDate",
      enableSort: true
    },
    {
      label: "Status",
      name: "doctorStatus",
      enableSort: false
    },
    {
      label: "Programme name",
      name: "programmeName",
      enableSort: false
    },
    {
      label: "Programme membership type",
      name: "programmeMembershipType",
      enableSort: false
    },
    {
      label: "CCT date",
      name: "cctDate",
      enableSort: true
    },
    {
      label: "Admin",
      name: "admin",
      enableSort: false
    },
    {
      label: "Last updated",
      name: "lastUpdatedDate",
      enableSort: true
    }
  ];

  public columnLabels: string[] = this.columnData.map((i) => i.label);

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.emitTraineeListEvents();
  }

  private emitTraineeListEvents(): void {
    this.store.dispatch(
      new SortTrainees(
        this.route.snapshot.queryParams.active || null,
        this.route.snapshot.queryParams.direction || null
      )
    );
    this.store.dispatch(new GetTrainees());
  }

  public traineeDetails(event: Event, row: ITrainee): void {
    event.stopPropagation();
    this.router.navigate(["/dashboard/trainee", row.gmcReferenceNumber]);
  }

  public sortTrainees(event: Sort): void {
    if (event.direction.length) {
      this.router
        .navigate(["/trainees"], {
          queryParams: {
            active: event.active,
            direction: event.direction
          }
        })
        .then(() => this.emitTraineeListEvents());
    } else {
      this.router
        .navigate(["/trainees"])
        .then(() => this.emitTraineeListEvents());
    }
  }
}
