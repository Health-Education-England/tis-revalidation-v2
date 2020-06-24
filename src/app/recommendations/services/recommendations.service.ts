import { HttpParams, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment";
import { Observable } from "rxjs";
import { IRecommendationsResponse } from "../recommendations.interfaces";

@Injectable({
  providedIn: "root"
})
export class RecommendationsService {
  constructor(private http: HttpClient) {}

  public getRecommendations(
    httpParams: HttpParams
  ): Observable<IRecommendationsResponse> {
    return this.http.get<IRecommendationsResponse>(
      environment.appUrls.getRecommendations,
      {
        params: httpParams
      }
    );
  }
}
