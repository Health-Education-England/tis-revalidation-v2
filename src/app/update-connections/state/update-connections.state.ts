import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { map } from "rxjs/operators";
import { IDesignatedBody } from "src/app/reference/reference.interfaces";
import { ReferenceService } from "src/app/reference/services/reference.service";
import { EnableUpdateConnections, Get } from "./update-connections.actions";

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

  @Action(Get)
  get({ patchState }: StateContext<UpdateConnectionsStateModel>, {}: Get) {
    return this.service.getDbcs().pipe(
      map((response: IDesignatedBody[]) => {
        patchState({
          dbcs: response
        });
      })
    );
  }
}
