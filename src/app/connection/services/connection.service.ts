import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment";
import { Observable } from "rxjs";
import { IConnectionResponse } from "../connection.interfaces";

@Injectable({
  providedIn: "root"
})
export class ConnectionService {
  constructor(private http: HttpClient) {}

  showDiscrepancy(discrepancyId): Observable<any> {
    return this.http.delete<void>(
      `${environment.appUrls.showDiscrepancy}/${discrepancyId}`
    );
  }

  getConnectionHistory(
    gmcNumber: number
  ): Observable<IConnectionResponse | any> {
    return this.http.get<IConnectionResponse>(
      `${environment.appUrls.getConnections}/${gmcNumber}`
    );
  }
}
