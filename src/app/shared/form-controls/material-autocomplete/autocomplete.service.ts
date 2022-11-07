import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { AuthService } from "src/app/core/auth/auth.service";
import { environment } from "@environment";
export interface AutocompleteResults {
  results: string[];
}

@Injectable({
  providedIn: "root"
})
export class AutocompleteService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  filterItems(value: string, items: string[] = []): Observable<string[]> {
    return of(
      items.filter((name: string) =>
        name.toLowerCase().includes(value.toLowerCase())
      )
    );
  }

  getItems(fieldName: string, query: string): Observable<any> {
    const params = new HttpParams()
      .set("fieldName", fieldName)
      .set("input", query)
      .set("dbcs", this.authService.userDesignatedBodies?.join(","));
    return this.http.get<AutocompleteResults>(
      `${environment.appUrls.autocomplete}`,
      { params }
    );
  }
}
