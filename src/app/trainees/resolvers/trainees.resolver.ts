import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Store } from "@ngxs/store";
import { ITraineeRouteParams, DefaultRouteParams } from "../trainees.interface";
import { GetTrainees } from "../state/trainees.actions";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class TraineesResolver implements Resolve<any> {
  private default: ITraineeRouteParams = DefaultRouteParams;
  constructor(private store: Store) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    let payload: ITraineeRouteParams;
    payload = { ...payload, ...this.default };
    payload = { ...payload, ...route.params };
    const copy = {};
    Object.keys(payload).forEach((key) => {
      if (payload[key] !== null) {
        copy[key] = payload[key];
      }
    });
    route.params = copy;
    return this.store.dispatch(new GetTrainees(payload));
  }
}
