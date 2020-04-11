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
export class TraineesUnderNoticeResolver implements Resolve<any> {
  private defaultUnderNotice: ITraineeRouteParams = DefaultRouteParams;
  constructor(private store: Store) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    let payloadUnderNotice: ITraineeRouteParams;
    this.defaultUnderNotice = {
      ...this.defaultUnderNotice,
      ...{ underNotice: true }
    };
    payloadUnderNotice = { ...payloadUnderNotice, ...this.defaultUnderNotice };
    payloadUnderNotice = { ...payloadUnderNotice, ...route.params };
    const copy = {};
    Object.keys(payloadUnderNotice).forEach((key) => {
      if (payloadUnderNotice[key] !== null) {
        copy[key] = payloadUnderNotice[key];
      }
    });
    route.params = copy;
    return this.store.dispatch(new GetTrainees(payloadUnderNotice));
  }
}
