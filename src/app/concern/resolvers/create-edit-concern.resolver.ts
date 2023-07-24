import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngxs/store";
import { Observable, from } from "rxjs";
import { IConcernSummary } from "../concern.interfaces";
import { ConcernState } from "../state/concern.state";
import { SetSelectedConcern } from "../state/concern.actions";
import { defaultConcern } from "../constants";

@Injectable()
export class CreateEditConcernResolver  {
  constructor(private store: Store, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<any> {
    const concernId = route.params.concernId;
    const redirectToUnknown = () => {
      return from(this.router.navigate(["/404"]));
    };
    if (concernId) {
      const selectedConcern = this.store
        .selectSnapshot(ConcernState)
        .history.find(
          (concern: IConcernSummary) => concern.concernId === concernId
        );
      if (selectedConcern) {
        return this.store.dispatch(new SetSelectedConcern(selectedConcern));
      } else {
        return redirectToUnknown();
      }
    } else {
      const _gmcNumber = route.parent.params.gmcNumber;
      if (_gmcNumber) {
        const concern = {
          ...defaultConcern,
          ...{ gmcNumber: Number(_gmcNumber) }
        };
        return this.store.dispatch(new SetSelectedConcern(concern));
      } else {
        return redirectToUnknown();
      }
    }
  }
}
