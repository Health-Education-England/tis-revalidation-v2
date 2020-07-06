import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Store } from "@ngxs/store";
import {
  IRecommendationSummary,
  RecommendationStatus
} from "../recommendation-history.interface";
import { Injectable } from "@angular/core";
import { RecommendationHistoryService } from "../services/recommendation-history.service";

@Injectable()
export class NotSubmittedGuard implements CanActivate {
  constructor(
    private store: Store,
    private service: RecommendationHistoryService
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const item: IRecommendationSummary = this.store.selectSnapshot(
      (summary) => {
        const summaryItem = summary.recommendationHistory.item;
        return summaryItem.revalidations.find(
          (reval: IRecommendationSummary) =>
            reval.recommendationStatus !== RecommendationStatus.SUBMITTED_TO_GMC
        );
      }
    );
    // TODO: replace !!1 with false
    // https://github.com/angular/angular/issues/24187
    const retval: boolean = item ? true : !!1;
    if (retval === false) {
      this.service.navigateToParentState(state);
    }
    return retval;
  }
}
