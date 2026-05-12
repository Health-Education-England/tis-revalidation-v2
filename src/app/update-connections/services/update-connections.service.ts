import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment";
import { Store } from "@ngxs/store";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import {
  IHideDiscrepancyResponse,
  IUpdateConnectionResponse
} from "src/app/connection/connection.interfaces";
import { CONNECTION_ACTIONS } from "../constants";
import { EnableUpdateConnections } from "../state/update-connections.actions";
import { ActionType, IAction } from "../update-connections.interfaces";

@Injectable({
  providedIn: "root"
})
export class UpdateConnectionsService {
  public canSave$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public canCancel$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public actions$: BehaviorSubject<IAction[]> = new BehaviorSubject<IAction[]>(
    CONNECTION_ACTIONS
  );

  public stateName = "updateConnections";

  constructor(
    private http: HttpClient,
    private store: Store
  ) {}

  public enableUpdateConnections(
    enableUpdateConnections: boolean
  ): Observable<any> {
    return this.store.dispatch(
      new EnableUpdateConnections(enableUpdateConnections)
    );
  }

  hideDiscrepancy(payload: any): Observable<IHideDiscrepancyResponse> {
    return this.http
      .post<IHideDiscrepancyResponse>(
        `${environment.appUrls.getConnections}/discrepancies/hidden`,
        payload
      )
      .pipe(catchError((err) => throwError(() => err)));
  }

  updateConnection(
    payload: any,
    actionType: ActionType
  ): Observable<IUpdateConnectionResponse> {
    let action: string;
    switch (actionType) {
      case ActionType.ADD_CONNECTION:
        action = "add";
        break;

      case ActionType.REMOVE_CONNECTION:
        action = "remove";
        break;
    }

    if (action) {
      return this.http
        .post<IUpdateConnectionResponse>(
          `${environment.appUrls.getConnections}/${action}`,
          payload
        )
        .pipe(catchError((err: Error) => throwError(() => err)));
    } else {
      return throwError(() => new Error("Action is not defined"));
    }
  }
}
