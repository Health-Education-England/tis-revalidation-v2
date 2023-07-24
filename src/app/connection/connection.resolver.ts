import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Store } from "@ngxs/store";
import { catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Get } from "./state/connection.actions";
import { RecordsService } from "../records/services/records.service";
import { stateName } from "../records/records.interfaces";
import { IConnectionResponse } from "./connection.interfaces";

@Injectable()
export class ConnectionResolver  {
  constructor(
    private store: Store,
    private router: Router,
    private recordsService: RecordsService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<IConnectionResponse> | Observable<any> {
    const gmcNumber: number = Number(route.params.gmcNumber);
    this.recordsService.summaryRoute = "/connections";
    this.recordsService.stateName = stateName.CONNECTIONS;
    return this.store.dispatch(new Get(gmcNumber)).pipe(
      catchError((error) => {
        return this.router.navigate(["/404"]);
      })
    );
  }
}
