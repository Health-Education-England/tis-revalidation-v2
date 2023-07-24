import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { IRecommendationHistory } from "../recommendation-history.interface";
import { Injectable } from "@angular/core";
import { RecommendationHistoryService } from "../services/recommendation-history.service";
import { Store } from "@ngxs/store";

@Injectable()
export class UnderNoticeGuard  {
  constructor(
    private service: RecommendationHistoryService,
    private store: Store
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const item: IRecommendationHistory = this.store.selectSnapshot(
      (recommendationState) => recommendationState.recommendationHistory.item
    );
    // TODO: replace !!1 with false
    // https://github.com/angular/angular/issues/24187
    const retval: boolean = item.underNotice
      ? item.underNotice.toLowerCase() === "yes"
      : !!1;
    if (retval === false) {
      this.service.navigateToParentState(state);
    }
    return retval;
  }
}
