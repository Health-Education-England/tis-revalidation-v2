import { Injectable } from "@angular/core";
import { State, Action, StateContext, Selector } from "@ngxs/store";
import { IGetConcernResponse, IConcernSummary } from "../concern.interfaces";
import { Get } from "./concern.actions";
import { ConcernService } from "../services/concern/concern.service";
import { tap } from "rxjs/operators";

export class ConcernStateModel {
  public concernId?: number;
  public gmcNumber: number;
  public history: IConcernSummary[];
  public selected?: IConcernSummary;
}

@State<ConcernStateModel>({
  name: "concern",
  defaults: {
    gmcNumber: null,
    history: []
  }
})
@Injectable()
export class ConcernState {
  constructor(private service: ConcernService) {}

  @Selector()
  public static history(state: ConcernStateModel) {
    return state.history;
  }

  @Selector()
  public static selected(state: ConcernStateModel) {
    return state.selected;
  }

  @Action(Get)
  get({ patchState }: StateContext<ConcernStateModel>, { payload }: Get) {
    if (isNaN(payload)) {
      throw new Error(`gmcNumber ${payload} must be of type number`);
    }

    return this.service.getConcernHistory(payload).pipe(
      tap((response: IGetConcernResponse) =>
        patchState({
          gmcNumber: response.gmcNumber || payload,
          history: response.concerns
        })
      )
    );
  }
}
