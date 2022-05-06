import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { ToggleFixedColumns } from "./record-list.actions";
export class RecordListStateModel {
  fixedColumns: boolean;
}

@State<RecordListStateModel>({
  name: "recordList",
  defaults: {
    fixedColumns: true
  }
})
@Injectable()
export class RecordListState {
  constructor() {}

  @Selector()
  static isFixedColumns(state: RecordListStateModel) {
    return state.fixedColumns;
  }

  @Action(ToggleFixedColumns)
  toggleFixedColumns(
    { getState, patchState }: StateContext<RecordListStateModel>,
    { payload }: ToggleFixedColumns
  ) {
    patchState({
      fixedColumns: payload
    });
  }
}
