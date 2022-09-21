import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
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
