import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { IRecommendationHistory } from "./recommendation-history.interface";
import { Observable } from "rxjs";
import { Store } from "@ngxs/store";
import { catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Get as GetRecommendationHistory } from "./state/recommendation-history.actions";
import { SpinnerService } from "../shared/spinner/spinner.service";

@Injectable()
export class RecommendationResolver implements Resolve<IRecommendationHistory> {
  constructor(
    private spinnerService: SpinnerService,
    private store: Store,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IRecommendationHistory> | Observable<any> {
    const gmcNumber: number = Number(route.params.gmcNumber);
    this.spinnerService.showSpinner();
    return this.store
      .dispatch(new GetRecommendationHistory(gmcNumber))
      .pipe(catchError(() => this.router.navigate(["/404"])));
  }
}
