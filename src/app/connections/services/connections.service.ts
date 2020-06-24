import { HttpParams, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IGetConnectionsResponse } from "../connections.interfaces";
import { environment } from "@environment";

@Injectable({
  providedIn: "root"
})
export class ConnectionsService {
  constructor(private http: HttpClient) {}

  public getConnections(
    httpParams: HttpParams
  ): Observable<IGetConnectionsResponse> {
    return this.http.get<IGetConnectionsResponse>(
      environment.appUrls.getConnections,
      {
        params: httpParams
      }
    );
  }
}
