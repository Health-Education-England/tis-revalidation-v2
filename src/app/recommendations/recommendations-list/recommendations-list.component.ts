import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { generateColumnData } from "../../shared/records/constants";
import { RecordListComponent } from "../../shared/records/record-list/record-list.component";
import { RecordsService } from "../../shared/records/services/records.service";
import { COLUMN_DATA } from "../constants";
import {
  Filter,
  Get,
  Paginate,
  ResetPaginator,
  ResetSort,
  Search,
  Sort
} from "../state/recommendations.actions";
import { RecommendationsFilterType } from "../recommendations.interfaces";

@Component({
  selector: "app-recommendations-list",
  templateUrl: "./recommendations-list.component.html",
  styleUrls: ["./recommendations-list.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class RecommendationsListComponent extends RecordListComponent
  implements OnInit {
  public dateColumns = [
    "cctDate",
    "submissionDate",
    "dateAdded",
    "lastUpdatedDate"
  ];
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
      this.params.filter === RecommendationsFilterType.ALL_DOCTORS
    ) {
      this.store.dispatch(new Filter(RecommendationsFilterType.ALL_DOCTORS));
    } else {
      this.store.dispatch(new Filter(RecommendationsFilterType.UNDER_NOTICE));
    }
  }
}
