import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { RecordsResolver } from "../shared/records/records.resolver";
import { RecordsService } from "../shared/records/services/records.service";
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
    this.recordsService.stateName = "recommendations";
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
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return super.resolve(route);
  }
}
