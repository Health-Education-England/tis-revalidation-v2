import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { IRevalidationHistory } from "./revalidation-history.interface";
import { Observable, forkJoin } from "rxjs";
import { Store } from "@ngxs/store";
import { catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { RevalidationHistoryAction } from "./state/revalidation-history.actions";
import { GetRevalidationNotes } from "./state/revalidation-notes.actions";

@Injectable()
export class TraineeResolver implements Resolve<IRevalidationHistory> {
  constructor(private store: Store, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IRevalidationHistory> | Observable<any> {
    const gmcID: number = Number(route.params.id);
    return forkJoin(
      // dispatch history data
      this.store.dispatch(new RevalidationHistoryAction(gmcID)).pipe(
        catchError((err: any) => {
          return this.router.navigate(["/404"]);
        })
      ),
      // dispatch trainee notes data
      this.store.dispatch(new GetRevalidationNotes(gmcID))
    );
  }
}
