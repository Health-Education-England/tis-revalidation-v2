import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { IDesignatedBody } from "src/app/reference/reference.interfaces";
import { ReferenceService } from "src/app/reference/services/reference.service";
import { EnableUpdateConnections } from "./update-connections.actions";

export class UpdateConnectionsStateModel {
  public enableUpdateConnections: boolean;
  public dbcs: IDesignatedBody[];
}

@State<UpdateConnectionsStateModel>({
  name: "updateConnections",
  defaults: {
    enableUpdateConnections: false,
    dbcs: []
  }
})
@Injectable()
export class UpdateConnectionsState {
  constructor(private service: ReferenceService) {}

  @Selector()
  public static Dbcs(state: UpdateConnectionsStateModel) {
    return state.dbcs;
  }

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
