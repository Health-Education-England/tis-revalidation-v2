import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import {
  IRecommendationHistory,
  IRecommendationSummary
} from "../recommendation-history.interface";
import { environment } from "@environment";
import { Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class RecommendationHistoryService {
  constructor(private http: HttpClient, private router: Router) {}

  public getRecommendationHistory(
    gmcNumber: number
  ): Observable<IRecommendationHistory | any> {
    return this.http.get<IRecommendationHistory>(
      `${environment.appUrls.getRecommendation}/${gmcNumber}`
    );
  }

  /**
   * for brand new recommendation we use POST
   * where this is an edit and has @recommendationId we use PUT
   * @param recommendation - IRecommendationSummary
   */
  public saveRecommendation(
    recommendation: IRecommendationSummary
  ): Observable<any> {
    const method: string = recommendation.recommendationId?.length
      ? "put"
      : "post";

    return this.http[method](
      environment.appUrls.saveRecommendation,
      recommendation
    );
  }

  public submitRecommendationToGMC(
    gmcNumber: number,
    recommendationId: string
  ): Observable<any> {
    if (!(!!gmcNumber && !!recommendationId)) {
      return throwError("gmcNumber and recommendationId are required");
    }

    const submitUrl = `${environment.appUrls.submitToGMC}/${gmcNumber}/submit/${recommendationId}`;
    return this.http.post(submitUrl, {});
  }

  public navigateToParentState(state: RouterStateSnapshot): void {
    const arr = state.url.split("/");
    arr.pop();
    const url = arr.join("/");
    this.router.navigate([url]);
  }
}
