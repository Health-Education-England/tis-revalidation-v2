import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPTY, Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "src/app/core/auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class AutocompleteService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  private filterProgrammeName(query: string) {
    const designatedBodies: string =
      this.authService.userDesignatedBodies?.join(",");

    const params = new HttpParams()
      .set("fieldName", "programmeName")
      .set("input", query)
      .set("dbcs", designatedBodies);
    console.log("params:", params);
    //return this.http.get<any[]>("endpoint", { params });
    const mock = ["apple", "banana", "cherry", "damson", "elderberry", "fig"];
    return of(mock);
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

  getData(query: string, methodName: string): Observable<any> {
    switch (methodName) {
      case "programmeName": {
        return this.filterProgrammeName(query);
        break;
      }
      case "loadMovies": {
        return this.loadNYMovies(query);
        break;
      }

      default: {
        return EMPTY;
      }
    }
  }
}
