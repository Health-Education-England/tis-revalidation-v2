import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import {
  IRecommendationHistory,
  IRecommendationSummary
} from "../recommendation-history.interface";
import { environment } from "@environment";

@Injectable({
  providedIn: "root"
})
export class RecommendationHistoryService {
  constructor(private http: HttpClient) {}

  getrecommendationHistory(
    gmcNumber: number
  ): Observable<IRecommendationHistory | any> {
    return this.http.get<IRecommendationHistory>(
      `${environment.appUrls.getRecommendation}/${gmcNumber}`
    );
  }

  /**
   * for brand new recommendation we use POST where this is an edit and has @recommendationId we use PUT
   * @param recommendation the recommendation interface
   */
  saveRecommendation(recommendation: IRecommendationSummary): Observable<any> {
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
    gmcNumber: number,
    recommendationId: string
  ): Observable<any> {
    if (!(!!gmcNumber && !!recommendationId)) {
      return throwError("gmcNumber and recommendationId are required");
    }

    const submitUrl = `${environment.appUrls.submitToGMC}`
      .replace(/{gmcNumber}/, gmcNumber.toString())
      .replace(/{recommendationId}/, recommendationId);
    return this.http.post(submitUrl, {});
  }
}
