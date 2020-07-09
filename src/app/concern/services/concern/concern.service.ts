import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { environment } from "@environment";
import { IConcernHistory } from "../../concern.interfaces";

@Injectable({
  providedIn: "root"
})
export class ConcernService {
  constructor(private http: HttpClient) {}

  getConcernHistory(gmcNumber: number): Observable<IConcernHistory | any> {
    return this.http.get<IConcernHistory>(
      `${environment.appUrls.getConcern}/${gmcNumber}`
    );
  }
}
