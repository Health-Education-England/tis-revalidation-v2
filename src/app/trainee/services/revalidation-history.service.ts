import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import {
  IRevalidationHistory,
  IRevalidation
} from "../revalidation-history.interface";
import { environment } from "@environment";

@Injectable({
  providedIn: "root"
})
export class RevalidationHistoryService {
  constructor(private http: HttpClient) {}

  getRevalidationHistory(
    gmcId: number
  ): Observable<IRevalidationHistory | any> {
    return this.http.get<IRevalidationHistory>(
      `${environment.appUrls.getRecommendation}/${gmcId}`
    );
  }

  /**
   * for brand new recommendation we use POST where this is an edit and has @recommendationId we use PUT
   * @param recommendation the recommendation interface
   */
  saveRecommendation(recommendation: IRevalidation): Observable<any> {
    if (!!recommendation.recommendationId) {
      return this.http.put(
        `${environment.appUrls.saveRecommendation}`,
        recommendation
      );
    } else {
      return this.http.post(
        `${environment.appUrls.saveRecommendation}`,
        recommendation
      );
    }
  }

  submitRecommendationToGMC(
    gmcId: number,
    recommendationId: string
  ): Observable<any> {
    if (!(!!gmcId && !!recommendationId)) {
      return throwError("gmcId and recommendationId are required");
    }

    const submitUrl = `${environment.appUrls.submitToGMC}`
      .replace(/{gmcId}/, gmcId.toString())
      .replace(/{recommendationId}/, recommendationId);
    return this.http.post(submitUrl, {});
  }
}
