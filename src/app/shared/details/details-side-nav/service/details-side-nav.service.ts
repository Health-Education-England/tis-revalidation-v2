import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IRecommendationHistory } from "src/app/recommendation/recommendation-history.interface";
import { environment } from "@environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class DetailsSideNavService {
  constructor(private http: HttpClient) {}

  getDetails(gmcId: number): Observable<IRecommendationHistory | any> {
    // TODO: ammend url when split services
    return this.http.get<IRecommendationHistory>(
      `${environment.appUrls.getDetails}/${gmcId}`
    );
  }
}
