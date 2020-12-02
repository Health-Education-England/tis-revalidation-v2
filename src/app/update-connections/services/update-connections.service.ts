import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment";
import { Store } from "@ngxs/store";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { IUpdateConnectionResponse } from "src/app/connection/connection.interfaces";
import { EnableUpdateConnections } from "../state/update-connections.actions";

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
    action: string
  ): Observable<IUpdateConnectionResponse> {
    return this.http
      .post<IUpdateConnectionResponse>(
        `${environment.appUrls.getConnections}/${action}`,
        payload
      )
      .pipe(catchError(this.errorCallback));
  }

  private errorCallback(error: any) {
    return throwError(error);
  }
}
