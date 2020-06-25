import { Component, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { generateColumnData } from "../../shared/records/constants";
import { RecordListComponent } from "../../shared/records/record-list/record-list.component";
import { RecordsService } from "../../shared/records/services/records.service";
import { COLUMN_DATA } from "../constants";

@Component({
  selector: "app-recommendations-list",
  templateUrl: "./recommendations-list.component.html",
  styleUrls: ["./recommendations-list.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class RecommendationsListComponent extends RecordListComponent {
  public dateColumns = [
    "cctDate",
    "submissionDate",
    "dateAdded",
    "lastUpdatedDate"
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
