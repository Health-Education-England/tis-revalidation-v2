import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { IConnectionResponse } from "../connection.interfaces";

@Injectable({
  providedIn: "root"
})
export class ConnectionService {
  public canSave$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(private http: HttpClient) {}

  getConnectionHistory(
    gmcNumber: number
  ): Observable<IConnectionResponse | any> {
    return this.http.get<IConnectionResponse>(
      `${environment.appUrls.getConnections}/${gmcNumber}`
    );
  }

  addConnection(payload: any) {
    return this.http
      .post(`${environment.appUrls.getConnections}/add`, payload)
      .pipe(catchError(this.errorCallback));
  }

  removeConnection(payload: any) {
    return this.http
      .post(`${environment.appUrls.getConnections}/remove`, payload)
      .pipe(catchError(this.errorCallback));
  }

  private errorCallback(error: any) {
    return throwError(error);
  }
}
