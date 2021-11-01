import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { IDetailsSideNav } from "../details-side-nav.interfaces";
import { DetailsSideNavService } from "../service/details-side-nav.service";
import { patch, updateItem } from "@ngxs/store/operators";
import {
  AddNote,
  Get as DetailsSideNavAction,
  EditNote
} from "./details-side-nav.actions";

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
      tisPersonId: null,
      notes: []
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

  @Action(AddNote)
  addNote(ctx: StateContext<any>, action: AddNote) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      item: {
        ...state.item,
        notes: [...[action.payload], ...state.item.notes]
      }
    });
  }

  @Action(EditNote)
  editNote(ctx: StateContext<any>, { payload }: EditNote) {
    ctx.setState(
      patch({
        item: patch({
          notes: updateItem(
            (item: any) => item.id === payload.id,
            patch({ text: payload.text })
          )
        })
      })
    );
  }
}
