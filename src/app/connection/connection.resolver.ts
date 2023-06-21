import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Store } from "@ngxs/store";
import { catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { IProgramme } from "./connection.interfaces";
import { Get } from "./state/connection.actions";
import { stateName } from "../records/records.interfaces";
import { RecordsService } from "../records/services/records.service";

@Injectable()
export class ConnectionResolver implements Resolve<IProgramme> {
  constructor(
    private store: Store,
    private router: Router,
    private recordsService: RecordsService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<IProgramme> | Observable<any> {
    const gmcNumber: number = Number(route.params.gmcNumber);
    this.recordsService.stateName = stateName.CONNECTIONS;
    return this.store.dispatch(new Get(gmcNumber)).pipe(
      catchError((error) => {
        return this.router.navigate(["/404"]);
      })
    );
  }
}
