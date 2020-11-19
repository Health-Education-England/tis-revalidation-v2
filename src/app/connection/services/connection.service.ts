import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment";
import { Observable, of, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { IConnectionResponse } from "../connection.interfaces";

@Injectable({
  providedIn: "root"
})
export class ConnectionService {
  constructor(private http: HttpClient) {}

  getConnectionHistory(
    gmcNumber: number
  ): Observable<IConnectionResponse | any> {
    return this.http.get<IConnectionResponse>(
      `${environment.appUrls.getConnections}/${gmcNumber}`
    );
  }

  addConnection(formData: any) {
    return this.http
      .post(`${environment.appUrls.getConnections}/add`, formData)
      .pipe(catchError(this.errorCallback));
  }

  removeConnection(formData: any) {
    return this.http
      .post(`${environment.appUrls.getConnections}/remove`, formData)
      .pipe(catchError(this.errorCallback));
  }

  private errorCallback(error: any) {
    return throwError(error);
  }
}
