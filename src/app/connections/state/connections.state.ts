import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { ConnectionsService } from "../services/connections.service";
import { GetConnections } from "./connections.actions";
import { HttpParams } from "@angular/common/http";
import { map, catchError, finalize } from "rxjs/operators";
import { IGetConnectionsResponse } from "../connections.interfaces";
import { of } from "rxjs";

export class ConnectionsStateModel {
  public item: IGetConnectionsResponse;
  public loading: boolean;
  public error?: string;
}

@State<ConnectionsStateModel>({
  name: "connections",
  defaults: {
    loading: null,
    error: null,
    item: {
      connectionsInfo: [],
      countTotal: 0,
      totalPages: 0,
      totalResults: 0
    }
  }
})
@Injectable()
export class ConnectionsState {
  constructor(protected connectionsService: ConnectionsService) {}

  @Action(GetConnections)
  get(ctx: StateContext<ConnectionsStateModel>, action: GetConnections) {
    const params = action.payload;
    let httpParams = new HttpParams();

    Object.keys(params).forEach((key) => {
      const val = params[key];
      if (val) {
        httpParams = httpParams.append(key, val);
      }
    });

    ctx.patchState({
      item: null,
      loading: true
    });

    return this.connectionsService.getConnections(httpParams).pipe(
      map((res: IGetConnectionsResponse) => {
        ctx.patchState({
          item: res
        });
      }),
      catchError((err: any) => {
        ctx.patchState({
          error: `Error: ${err.message}`
        });
        return of(err);
      }),
      finalize(() =>
        ctx.patchState({
          loading: false
        })
      )
    );
  }
}
