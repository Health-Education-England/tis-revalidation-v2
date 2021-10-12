import { Injectable } from "@angular/core";
import { State, Action, StateContext, Selector } from "@ngxs/store";
import { INote } from "../../details.interfaces";
import { ToggleDrawer } from "./notes-drawer.actions";

export class NotesDrawerStateModel {
  isOpen: boolean;
  notes: INote[];
}

export const initialNotesDrawerState: NotesDrawerStateModel = {
  isOpen: false,
  notes: [
    { text: "lorem ipsum", date: new Date(), id: 12345 },
    { text: "lorem ipsum", date: new Date(), id: 12345 },
    { text: "lorem ipsum", date: new Date(), id: 12345 }
  ]
};

@State<NotesDrawerStateModel>({
  name: "notesDrawer",
  defaults: initialNotesDrawerState
})
@Injectable()
export class NotesDrawerState {
  @Selector()
  public static drawerStatus(state: NotesDrawerStateModel): boolean {
    return state.isOpen;
  }

  @Selector()
  public static getNotes(state: NotesDrawerStateModel): INote[] {
    return state.notes;
  }

  constructor() {}

  @Action(ToggleDrawer)
  toggle({ getState, patchState }: StateContext<NotesDrawerStateModel>) {
    patchState({
      isOpen: getState().isOpen ? false : true
    });
  }
}
