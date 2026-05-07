import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { map } from "rxjs/operators";
import {
  IConnectionResponse,
  IConnectionHistory,
  IHiddenDiscrepancy
} from "../connection.interfaces";
import { ConnectionService } from "../services/connection.service";
import { Get } from "./connection.actions";

export class ConnectionStateModel {
  public gmcNumber: number;
  public connectionHistory: IConnectionHistory[];
  public hiddenDiscrepancies: IHiddenDiscrepancy[];
  public doctorCurrentDbc: string;
}

@State<ConnectionStateModel>({
  name: "connection",
  defaults: {
    gmcNumber: null,
    connectionHistory: [],
    hiddenDiscrepancies: [],
    doctorCurrentDbc: null
  }
})
@Injectable()
export class ConnectionState {
  constructor(private service: ConnectionService) {}

  @Selector()
  public static connectionHistory(state: ConnectionStateModel) {
    return state.connectionHistory;
  }

  @Selector()
  public static hiddenDiscrepancies(state: ConnectionStateModel) {
    return state.hiddenDiscrepancies;
  }

  @Selector()
  public static gmcNumber(state: ConnectionStateModel) {
    return state.gmcNumber;
  }

  @Selector()
  public static doctorCurrentDbc(state: ConnectionStateModel) {
    return state.doctorCurrentDbc;
  }

  @Action(Get)
  get({ patchState }: StateContext<ConnectionStateModel>, { payload }: Get) {
    if (isNaN(payload)) {
      throw new Error(`gmcNumber ${payload} must be of type number`);
    }
    return this.service.getConnectionHistory(payload).pipe(
      map((response: IConnectionResponse) => {
        patchState({
          gmcNumber: payload,
          connectionHistory: response.connection.connectionHistory,
          hiddenDiscrepancies: response.hiddenDiscrepancies,
          doctorCurrentDbc: response.designatedBodyCode.designatedBodyCode
        });
      })
    );
  }
}
