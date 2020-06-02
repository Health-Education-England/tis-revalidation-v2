import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { generateColumnData } from "../../shared/records/constants";
import { RecordListComponent } from "../../shared/records/record-list/record-list.component";
import { RecordsService } from "../../shared/records/services/records.service";
import { ConcernsFilterType } from "../concerns.interfaces";
import { COLUMN_DATA } from "../constants";
import {
  Filter,
  Get,
  Paginate,
  ResetPaginator,
  ResetSort,
  Search,
  Sort
} from "../state/concerns.actions";

@Component({
  selector: "app-concern-list",
  templateUrl: "./concern-list.component.html",
  encapsulation: ViewEncapsulation.None
})
export class ConcernListComponent extends RecordListComponent
  implements OnInit {
  public dateColumns = ["closedDate", "dateRaised", "status", "followUpDate"];
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
    if (this.params.filter && this.params.filter === ConcernsFilterType.OPEN) {
      this.store.dispatch(new Filter(ConcernsFilterType.OPEN));
    } else {
      this.store.dispatch(new Filter(ConcernsFilterType.CLOSED));
    }
  }
}
