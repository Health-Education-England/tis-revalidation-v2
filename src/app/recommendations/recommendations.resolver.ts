import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { generateColumnData } from "../records/constants";
import { RecordsResolver } from "../records/records.resolver";
import { RecordsService } from "../records/services/records.service";
import { COLUMN_DATA } from "./constants";
import { RecommendationsFilterType } from "./recommendations.interfaces";

@Injectable()
export class RecommendationsResolver extends RecordsResolver
  implements Resolve<any> {
  constructor(
    protected store: Store,
    protected recordsService: RecordsService
  ) {
    super(store, recordsService);
    this.initialiseData();
  }

  private initialiseData(): void {
    this.recordsService.stateName = "recommendations";
    this.recordsService.detailsRoute = "/recommendation";
    this.recordsService.setRecommendationsActions();
    this.recordsService.dateColumns = [
      "cctDate",
      "submissionDate",
      "dateAdded",
      "lastUpdatedDate"
    ];
    this.recordsService.columnData = generateColumnData(COLUMN_DATA);
    this.recordsService.filters = [
      {
        label: "ALL DOCTORS",
        name: RecommendationsFilterType.ALL_DOCTORS
      },
      {
        label: "UNDER NOTICE",
        name: RecommendationsFilterType.UNDER_NOTICE
      }
    ];
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return super.resolve(route);
  }
}
