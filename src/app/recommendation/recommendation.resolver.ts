import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { IRecommendationHistory } from "./recommendation-history.interface";
import { Observable, forkJoin } from "rxjs";
import { Store } from "@ngxs/store";
import { catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Get as GetRecommendationHistory } from "./state/recommendation-history.actions";
import { GetRecommendationNotes } from "./state/recommendation-notes.actions";

@Injectable()
export class RecommendationResolver implements Resolve<IRecommendationHistory> {
  constructor(private store: Store, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IRecommendationHistory> | Observable<any> {
    const gmcNumber: number = Number(route.params.gmcNumber);
    return forkJoin([
      this.store
        .dispatch(new GetRecommendationHistory(gmcNumber))
        .pipe(catchError(() => this.router.navigate(["/404"]))),
      this.store.dispatch(new GetRecommendationNotes(gmcNumber))
    ]);
  }
}
