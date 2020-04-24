import { State, Action, StateContext, Selector } from "@ngxs/store";
import { GetRevalidationNotes } from "./revalidation-notes.actions";
import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { RevalidationNotesService } from "../services/revalidation-notes.service";
import { INote } from "../revalidation-history.interface";

export class RevalidationNotesStateModel {
  public items: INote[];
}

@State<RevalidationNotesStateModel>({
  name: "revalidationNotes",
  defaults: {
    items: []
  }
})
@Injectable()
export class RevalidationNotesState {
  constructor(private service: RevalidationNotesService) {}

  @Selector()
  public static revalidationNotes(state: RevalidationNotesStateModel) {
    return state.items;
  }

  @Action(GetRevalidationNotes, { cancelUncompleted: true })
  get(
    ctx: StateContext<RevalidationNotesStateModel>,
    action: GetRevalidationNotes
  ) {
    const httpParam: HttpParams = new HttpParams().set(
      "id",
      action.payload.toString()
    );

    return this.service.getRevalidationNotes(httpParam).pipe(
      tap((result: INote[]) => {
        ctx.patchState({
          items: result
        });
      })
    );
  }
}
