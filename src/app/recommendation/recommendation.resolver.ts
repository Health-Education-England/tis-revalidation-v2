import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { IRecommendationHistory } from "./recommendation-history.interface";
import { Observable } from "rxjs";
import { Store } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { Get as GetRecommendationHistory } from "./state/recommendation-history.actions";
import { RecordsService } from "../records/services/records.service";
import { stateName } from "../records/records.interfaces";
import { Get as GetSideNavDetails } from "../details/details-side-nav/state/details-side-nav.actions";

@Injectable()
export class RecommendationResolver {
  constructor(
    private store: Store,
    private router: Router,
    private recordsService: RecordsService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<IRecommendationHistory> | Observable<any> {
    this.recordsService.summaryRoute = "/recommendations";
    this.recordsService.stateName = stateName.RECOMMENDATIONS;
    const gmcNumber: number = Number(route.params.gmcNumber);
    this.store.dispatch(new GetSideNavDetails(gmcNumber));
    return this.store.dispatch(new GetRecommendationHistory(gmcNumber));
  }
}
