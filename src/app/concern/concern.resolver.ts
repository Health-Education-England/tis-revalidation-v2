import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { Store } from "@ngxs/store";
import { catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { IConcernHistory } from "./concern-history.interface";
import { Get } from "./state/concern.actions";

@Injectable()
export class ConcernResolver implements Resolve<IConcernHistory> {
  constructor(private store: Store, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IConcernHistory> | Observable<any> {
    const gmcNumber: number = Number(route.params.gmcNumber);
    return this.store
      .dispatch(new Get(gmcNumber))
      .pipe(catchError(() => this.router.navigate(["/404"])));
  }
}
