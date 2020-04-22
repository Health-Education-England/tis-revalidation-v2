import { State, Action, StateContext, Selector } from "@ngxs/store";
import { GetRevalidationNotes } from "./revalidation-notes.actions";
import { HttpParams } from "@angular/common/http";
import { notesResponse1 } from "../mock-data/trainee-spec-data";
import { Injectable } from "@angular/core";
import { tap, catchError } from "rxjs/operators";
import { of } from "rxjs";
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

    const mockResponse = notesResponse1; // TODO: remove mock
    return this.service.getRevalidationNotes(httpParam).pipe(
      tap((result: INote[]) => {
        ctx.patchState({
          items: result
        });
      }),
      // TODO: delete catchError used to mock Trainee Data here
      catchError((err: any) => {
        ctx.patchState({
          items: mockResponse
        });
        return of(err);
      })
    );
  }
}
