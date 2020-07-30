import { Component, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { generateColumnData } from "../../records/constants";
import { RecordListComponent } from "../../records/record-list/record-list.component";
import { RecordsService } from "../../records/services/records.service";
import { COLUMN_DATA } from "../constants";

@Component({
  selector: "app-concern-list",
  templateUrl: "./concern-list.component.html",
  encapsulation: ViewEncapsulation.None
})
export class ConcernListComponent extends RecordListComponent {
  public dateColumns = [
    "closedDate",
    "dateRaised",
    "dateAdded",
    "followUpDate"
  ];
  public columnData = generateColumnData(COLUMN_DATA);

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected recordsService: RecordsService,
    protected router: Router,
    protected store: Store
  ) {
    super(activatedRoute, recordsService, router, store);
  }
}
