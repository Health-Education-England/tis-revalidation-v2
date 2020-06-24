import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { Store } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { GetRecommendations } from "./state/recommendations.actions";
import { TraineesService } from "../shared/trainees/trainees.service";
import { COLUMN_DATA, DATE_COLUMNS, DEFAULT_PARAMS } from "./constants";
import { IRecommendationsResponse } from "./recommendations.interfaces";

@Injectable()
export class RecommendationsResolver
  implements Resolve<IRecommendationsResponse> {
  constructor(private store: Store, private traineeService: TraineesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<IRecommendationsResponse> | Observable<any> {
    this.setServiceVariables();
    const routeParams = route.queryParams;
    const mergedParams = this.traineeService.mergeDefaultParameters(
      routeParams
    );
    return this.store.dispatch(new GetRecommendations(mergedParams));
  }

  private setServiceVariables() {
    this.traineeService.init(
      COLUMN_DATA,
      DATE_COLUMNS,
      DEFAULT_PARAMS,
      "/recommendation",
      "underNotice",
      "yes"
    );
  }
}
