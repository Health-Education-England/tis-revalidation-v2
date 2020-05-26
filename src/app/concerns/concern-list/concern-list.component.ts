import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { RecordListComponent } from "../../shared/records/record-list/record-list.component";
import { RecordsService } from "../../shared/records/services/records.service";
import { ConcernsFilterType } from "../concerns.interfaces";
import { Filter } from "../state/concerns.actions";

@Component({
  selector: "app-concern-list",
  templateUrl: "./concern-list.component.html",
  encapsulation: ViewEncapsulation.None
})
export class ConcernListComponent extends RecordListComponent
  implements OnInit {
  public dateColumns = ["closedDate", "dateRaised", "status", "followUpDate"];
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
      label: "Programme",
      name: "programmeNumber",
      enableSort: false
    },
    {
      label: "Date raised",
      name: "dateRaised",
      enableSort: true
    },
    {
      label: "Type",
      name: "type",
      enableSort: false
    },
    {
      label: "Site",
      name: "site",
      enableSort: false
    },
    {
      label: "Source",
      name: "source",
      enableSort: false
    },
    {
      label: "Status",
      name: "status",
      enableSort: false
    },
    {
      label: "Admin",
      name: "admin",
      enableSort: false
    },
    {
      label: "Follow-up date",
      name: "followUpDate",
      enableSort: false
    },
    {
      label: "Closed date",
      name: "closedDate",
      enableSort: false
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
    if (this.params.filter && this.params.filter === ConcernsFilterType.OPEN) {
      this.store.dispatch(new Filter(ConcernsFilterType.OPEN));
    } else {
      this.store.dispatch(new Filter(ConcernsFilterType.CLOSED));
    }
  }
}
