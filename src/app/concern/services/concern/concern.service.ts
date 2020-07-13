import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { environment } from "@environment";
import { IGetConcernResponse } from "../../concern.interfaces";

@Injectable({
  providedIn: "root"
})
export class ConcernService {
  constructor(private http: HttpClient) {}

  getConcernHistory(gmcNumber: number): Observable<IGetConcernResponse | any> {
    return this.http.get<IGetConcernResponse>(
      `${environment.appUrls.getConcern}/${gmcNumber}`
    );
  }
}
