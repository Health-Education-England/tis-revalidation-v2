import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { Store } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { TraineesService } from "../shared/trainees/trainees.service";
import { COLUMN_DATA, DATE_COLUMNS, DEFAULT_PARAMS } from "./constants";
import { IGetConnectionsResponse } from "./connections.interfaces";
import { GetConnections } from "./state/connections.actions";

@Injectable()
export class ConnectionsResolver implements Resolve<IGetConnectionsResponse> {
  constructor(private store: Store, private traineeService: TraineesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<IGetConnectionsResponse> | Observable<any> {
    this.setServiceVariables();
    const routeParams = route.queryParams;
    const mergedParams = this.traineeService.mergeDefaultParameters(
      routeParams
    );
    return this.store.dispatch(new GetConnections(mergedParams));
  }

  private setServiceVariables() {
    this.traineeService.init(
      COLUMN_DATA,
      DATE_COLUMNS,
      DEFAULT_PARAMS,
      "/concern",
      "concernsStatus",
      "open"
    );
  }
}
