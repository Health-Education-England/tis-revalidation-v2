import { Injectable } from "@angular/core";
import { State, Action, StateContext, Selector } from "@ngxs/store";
import { Get as DetailsSideNavAction } from "./details-side-nav.actions";
import { IRecommendationHistory } from "src/app/recommendation/recommendation-history.interface";
import { defaultRecommendation } from "src/app/recommendation/state/recommendation-history.state"; // TODO: delete on splity services
import { DetailsSideNavService } from "../service/details-side-nav.service";
import { tap } from "rxjs/operators";

export class DetailsSideNavStateModel {
  public item: IRecommendationHistory;
}
@State<DetailsSideNavStateModel>({
  name: "traineeDetails",
  defaults: {
    item: {
      gmcNumber: null,
      fullName: null,
      cctDate: null,
      programmeMembershipType: null,
      currentGrade: null,
      deferralReasons: [],
      underNotice: null,
      revalidations: [defaultRecommendation]
    }
  }
})
@Injectable()
export class DetailsSideNavState {
  constructor(private service: DetailsSideNavService) {}

  @Selector()
  public static traineeDetails(
    state: DetailsSideNavStateModel
  ): IRecommendationHistory {
    // TODO: change model when service split
    return state.item;
  }

  @Action(DetailsSideNavAction)
  get(
    ctx: StateContext<DetailsSideNavStateModel>,
    { gmcNumber }: DetailsSideNavAction
  ) {
    // throw error if NotANumber NaN is passed as query parameter
    if (isNaN(gmcNumber)) {
      const err: Error = new Error(
        `gmcNumber ${gmcNumber} must be of type number`
      );
      throw err;
    }

    return this.service.getDetails(gmcNumber).pipe(
      tap((result: IRecommendationHistory) => {
        ctx.patchState({
          item: result
        });
      })
    );
  }
}
