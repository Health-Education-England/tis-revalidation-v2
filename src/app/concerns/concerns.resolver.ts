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
import { GetConcerns } from "./state/concerns.actions";
import { IGetConcernsResponse } from "./concerns.interfaces";

@Injectable()
export class ConcernsResolver implements Resolve<IGetConcernsResponse> {
  constructor(private store: Store, private traineeService: TraineesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<IGetConcernsResponse> | Observable<any> {
    this.setServiceVariables();
    const routeParams = route.queryParams;
    const mergedParams = this.traineeService.mergeDefaultParameters(
      routeParams
    );
    return this.store.dispatch(new GetConcerns(mergedParams));
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
