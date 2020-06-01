import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { generateColumnData } from "../../shared/records/constants";
import { RecordListComponent } from "../../shared/records/record-list/record-list.component";
import { RecordsService } from "../../shared/records/services/records.service";
import { ConnectionsFilterType } from "../connections.interfaces";
import { COLUMN_DATA } from "../constants";
import {
  Filter,
  Get,
  Paginate,
  ResetPaginator,
  ResetSort,
  Search,
  Sort
} from "../state/connections.actions";

@Component({
  selector: "app-connection-list",
  templateUrl: "./connection-list.component.html"
})
export class ConnectionListComponent extends RecordListComponent
  implements OnInit {
  public dateColumns = ["gmcSubmissionDate", "endDate", "startDate"];
  public columnData = generateColumnData(COLUMN_DATA);

  constructor(
    protected recordsService: RecordsService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected store: Store
  ) {
    super(recordsService, route, router, store);
    this.recordsService.setActions(
      Get,
      Sort,
      ResetSort,
      Paginate,
      ResetPaginator,
      Search
    );
  }

  ngOnInit(): void {
    this.setupInitialFilter();
  }

  public setupInitialFilter(): void {
    if (
      this.params.filter &&
      this.params.filter === ConnectionsFilterType.ADD_CONNECTION
    ) {
      this.store.dispatch(new Filter(ConnectionsFilterType.ADD_CONNECTION));
    } else {
      this.store.dispatch(new Filter(ConnectionsFilterType.ALL));
    }
  }
}
