import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPTY, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AutocompleteService {
  constructor(private http: HttpClient) {}

  loadNYMovies(query: string): Observable<any[]> {
    const apiKey: string = "GyIcunqNC1k86GYGU21QAUTdESGlGUOP";
    const params = new HttpParams().set("api-key", apiKey).set("query", query);

    return this.http.get<any[]>("nymovies", { params }).pipe(
      tap((data) => {
        console.log("data ", data);
      }),
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
