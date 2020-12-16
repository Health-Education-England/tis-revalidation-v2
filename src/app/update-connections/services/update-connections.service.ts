import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment";
import { Store } from "@ngxs/store";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { IUpdateConnectionResponse } from "src/app/connection/connection.interfaces";
import { EnableUpdateConnections } from "../state/update-connections.actions";
import { ActionType } from "../update-connections.interfaces";

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
  public stateName = "updateConnections";

  constructor(private http: HttpClient, private store: Store) {}

  public enableUpdateConnections(
    enableUpdateConnections: boolean
  ): Observable<any> {
    return this.store.dispatch(
      new EnableUpdateConnections(enableUpdateConnections)
    );
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

      case ActionType.HIDE_CONNECTION:
        action = "hide";
        break;

      case ActionType.UNHIDE_CONNECTION:
        action = "unhide";
        break;
    }

    if (action) {
      return this.http
        .post<IUpdateConnectionResponse>(
          `${environment.appUrls.getConnections}/${action}`,
          payload
        )
        .pipe(catchError(this.errorCallback));
    } else {
      return this.errorCallback("Action is not defined");
    }
  }

  private errorCallback(error: any) {
    return throwError(error);
  }
}
