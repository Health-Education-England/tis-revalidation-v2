import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "src/app/core/auth/auth.service";
import { environment } from "@environment";

@Injectable({
  providedIn: "root"
})
export class AutocompleteService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  getItems(fieldName: string, query: string): Observable<any> {
    const params = new HttpParams()
      .set("fieldName", fieldName)
      .set("input", query)
      .set("dbcs", this.authService.userDesignatedBodies?.join(","));
    return this.http.get<{ results: string[] }>(
      `${environment.appUrls.autocomplete}`,
      { params }
    );
  }

  private loadNYMovies(query: string): Observable<any[]> {
    const apiKey: string = "GyIcunqNC1k86GYGU21QAUTdESGlGUOP";
    const params = new HttpParams().set("api-key", apiKey).set("query", query);

    return this.http.get<any[]>("nymovies", { params }).pipe(
      map((data: any) => {
        if (data["results"]) {
          return data["results"];
        }
        return [];
      }),
      map((data: any) => {
        if (data.length) {
          return data.map((item: any) => item["display_title"]);
        }
      })
    );
  }
}
