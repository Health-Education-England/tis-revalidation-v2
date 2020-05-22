import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { IRevalidationHistory } from "../revalidation-history.interface";
import { environment } from "@environment";

@Injectable({
  providedIn: "root"
})
export class RevalidationHistoryService {
  constructor(private http: HttpClient) {}

  getRevalidationHistory(
    gmcID: number
  ): Observable<IRevalidationHistory | any> {
    return this.http.get<IRevalidationHistory>(
      `${environment.appUrls.getRecommendation}/${gmcID}`
    );
  }
}
