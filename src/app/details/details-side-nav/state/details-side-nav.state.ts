import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { IDetailsSideNav } from "../details-side-nav.interfaces";
import { DetailsSideNavService } from "../service/details-side-nav.service";
import { Get as DetailsSideNavAction } from "./details-side-nav.actions";

export class DetailsSideNavStateModel {
  public item: IDetailsSideNav;
}
@State<DetailsSideNavStateModel>({
  name: "traineeDetails",
  defaults: {
    item: {
      gmcNumber: null,
      forenames: null,
      surname: null,
      cctDate: null,
      programmeMembershipType: null,
      programmeName: null,
      currentGrade: null,
      tisPersonId: null
    }
  }
})
@Injectable()
export class DetailsSideNavState {
  constructor(private service: DetailsSideNavService) {}

  @Selector()
  public static traineeDetails(
    state: DetailsSideNavStateModel
  ): IDetailsSideNav {
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
      tap((result: IDetailsSideNav) => {
        ctx.patchState({
          item: result
        });
      })
    );
  }
}
