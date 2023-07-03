import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { IRecommendationHistory } from "./recommendation-history.interface";
import { Observable } from "rxjs";
import { Store } from "@ngxs/store";
import { catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Get as GetRecommendationHistory } from "./state/recommendation-history.actions";
import { RecordsService } from "../records/services/records.service";
import { stateName } from "../records/records.interfaces";

@Injectable()
export class RecommendationResolver implements Resolve<IRecommendationHistory> {
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

    return this.store
      .dispatch(new GetRecommendationHistory(gmcNumber))
      .pipe(catchError(() => this.router.navigate(["/404"])));
  }
}
