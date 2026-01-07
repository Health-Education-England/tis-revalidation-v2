import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of, tap } from "rxjs";
import { AuthService } from "src/app/core/auth/auth.service";
import { environment } from "@environment";
import { Store } from "@ngxs/store";
import { IAdmin } from "src/app/admins/admins.interfaces";
export interface AutocompleteResults {
  results: string[];
}

@Injectable({
  providedIn: "root"
})
export class AutocompleteService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    readonly store: Store
  ) {}

  admins$: Observable<IAdmin[]> = this.store.select(
    (state) => state.admins.items
  );

  filterItems(value: string, items: string[] = []): Observable<string[]> {
    return of(
      items.filter((name: string) =>
        name.toLowerCase().includes(value.toLowerCase())
      )
    );
  }

  getAdmins(args: {}): Observable<any[]> {
    const query = args["query"];
    return this.admins$.pipe(
      map((admins: IAdmin[]) => {
        const fullNames = [
          ...admins?.map((admin) => admin.fullName),
          "Updated by GMC"
        ];
        return fullNames.filter((fullname) =>
          fullname.toLowerCase().includes(query.toLowerCase())
        );
      })
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
