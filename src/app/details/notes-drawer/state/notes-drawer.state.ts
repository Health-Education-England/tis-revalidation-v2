import { Injectable } from "@angular/core";
import { State, Action, StateContext, Selector } from "@ngxs/store";
import { ToggleDrawer } from "./notes-drawer.actions";

export class NotesDrawerStateModel {
  isOpen: boolean;
}

export const initialNotesDrawerState: NotesDrawerStateModel = {
  isOpen: true
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

  constructor() {}

  @Action(ToggleDrawer)
  toggle({ getState, patchState }: StateContext<NotesDrawerStateModel>) {
    patchState({
      isOpen: getState().isOpen ? false : true
    });
  }
}
