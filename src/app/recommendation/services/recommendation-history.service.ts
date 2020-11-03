import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import {
  IRecommendationHistory,
  IRecommendationSummary
} from "../recommendation-history.interface";
import { environment } from "@environment";
import { Router, RouterStateSnapshot } from "@angular/router";
import { catchError } from "rxjs/operators";

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
    ).pipe(catchError(this.errorCallback));
  }

  public submitRecommendationToGMC(
    gmcNumber: number,
    recommendationId: string,
    designatedBody: string
  ): Observable<any> {
    if (!(!!gmcNumber && !!recommendationId && !!designatedBody)) {
      return throwError("gmcNumber and recommendationId are required");
    }

    const headers: HttpHeaders = new HttpHeaders({
      designatedBodyCode: designatedBody
    });

    const submitUrl = `${environment.appUrls.submitToGMC}/${gmcNumber}/submit/${recommendationId}`;
    return this.http.post(submitUrl, {}, { headers });
  }

  public navigateToParentState(state: RouterStateSnapshot): void {
    const arr = state.url.split("/");
    arr.pop();
    const url = arr.join("/");
    this.router.navigate([url]);
  }

  private errorCallback(error: any) {
    return throwError(error);
  }
}
