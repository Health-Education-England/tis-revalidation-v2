import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { EnableUpdateConnections } from "./update-connections.actions";

export class UpdateConnectionsStateModel {
  public enableUpdateConnections: boolean;
}

@State<UpdateConnectionsStateModel>({
  name: "updateConnections",
  defaults: {
    enableUpdateConnections: false
  }
})
@Injectable()
export class UpdateConnectionsState {
  @Action(EnableUpdateConnections)
  enableUpdateConnections(
    ctx: StateContext<UpdateConnectionsStateModel>,
    action: EnableUpdateConnections
  ) {
    return ctx.patchState({
      enableUpdateConnections: action.enableUpdateConnections
    });
  }
}
