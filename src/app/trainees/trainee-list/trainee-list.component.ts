import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { RecordListComponent } from "../../shared/records/record-list/record-list.component";
import { RecordsService } from "../../shared/records/services/records.service";
import { Filter } from "../state/trainees.actions";
import { TraineesFilterType } from "../trainees.interfaces";

@Component({
  selector: "app-trainee-list",
  templateUrl: "./trainee-list.component.html",
  styleUrls: ["./trainee-list.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class TraineeListComponent extends RecordListComponent
  implements OnInit {
  public dateColumns = [
    "cctDate",
    "submissionDate",
    "dateAdded",
    "lastUpdatedDate"
  ];
  public columnData = [
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

  constructor(
    protected recordsService: RecordsService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected store: Store
  ) {
    super(recordsService, route, router, store);
  }

  ngOnInit(): void {
    this.setupInitialFilter();
  }

  public setupInitialFilter(): void {
    if (
      this.params.filter &&
      this.params.filter === TraineesFilterType.ALL_DOCTORS
    ) {
      this.store.dispatch(new Filter(TraineesFilterType.ALL_DOCTORS));
    } else {
      this.store.dispatch(new Filter(TraineesFilterType.UNDER_NOTICE));
    }
  }
}
