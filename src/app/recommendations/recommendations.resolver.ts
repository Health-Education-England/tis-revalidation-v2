import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { generateColumnData } from "../records/constants";
import { RecordsResolver } from "../records/records.resolver";
import { RecordsService } from "../records/services/records.service";
import { COLUMN_DATA } from "./constants";
import {
  ClearRecommendationsSearch,
  EnableRecommendationsAllocateAdmin,
  FilterRecommendations,
  GetRecommendations,
  PaginateRecommendations,
  ResetRecommendationsFilter,
  ResetRecommendationsPaginator,
  ResetRecommendationsSort,
  RecommendationsSearch,
  SortRecommendations,
  ToggleRecommendationsCheckbox,
  ToggleAllRecommendationsCheckboxes
} from "./state/recommendations.actions";

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
    this.recordsService.setActions(
      ClearRecommendationsSearch,
      FilterRecommendations,
      GetRecommendations,
      PaginateRecommendations,
      ResetRecommendationsFilter,
      ResetRecommendationsPaginator,
      ResetRecommendationsSort,
      RecommendationsSearch,
      SortRecommendations,
      EnableRecommendationsAllocateAdmin,
      ToggleRecommendationsCheckbox,
      ToggleAllRecommendationsCheckboxes
    );
    this.recordsService.dateColumns = [
      "cctDate",
      "submissionDate",
      "dateAdded",
      "lastUpdatedDate"
    ];
    this.recordsService.columnData = generateColumnData(COLUMN_DATA);
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return super.resolve(route);
  }
}
