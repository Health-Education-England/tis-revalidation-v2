import { HttpParams, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IGetConcernsResponse } from "../concerns.interfaces";
import { Observable } from "rxjs";
import { environment } from "@environment";

@Injectable({
  providedIn: "root"
})
export class ConcernsService {
  constructor(private http: HttpClient) {}

  public getConcerns(httpParams: HttpParams): Observable<IGetConcernsResponse> {
    return this.http.get<IGetConcernsResponse>(
      environment.appUrls.getConcerns,
      {
        params: httpParams
      }
    );
  }
}
