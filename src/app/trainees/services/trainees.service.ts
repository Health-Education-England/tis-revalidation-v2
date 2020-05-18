import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "@environment";
import { Store } from "@ngxs/store";
import { BehaviorSubject, Observable } from "rxjs";
import { TraineesStateModel } from "../state/trainees.state";
import {
  IGetTraineesResponse,
  TraineesFilterType
} from "../trainees.interfaces";

@Injectable({
  providedIn: "root"
})
export class TraineesService {
  public resetSearchForm$: BehaviorSubject<boolean> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store
  ) {}

  public getTrainees(params?: HttpParams): Observable<IGetTraineesResponse> {
    return this.http.get<IGetTraineesResponse>(
      `${environment.appUrls.getTrainees}`,
      { params }
    );
  }

  public generateParams(): HttpParams {
    const snapshot: TraineesStateModel = this.store.snapshot().trainees;

    let params: HttpParams = new HttpParams()
      .set("sortColumn", snapshot.sort.active)
      .set("sortOrder", snapshot.sort.direction)
      .set("pageNumber", snapshot.pageIndex.toString())
      .set(
        TraineesFilterType.UNDER_NOTICE,
        snapshot.filter === TraineesFilterType.UNDER_NOTICE ? "true" : "false"
      );

    if (snapshot.searchQuery) {
      params = params.append("searchQuery", snapshot.searchQuery);
    }

    return params;
  }

  public updateTraineesRoute(): Promise<boolean> {
    const snapshot: TraineesStateModel = this.store.snapshot().trainees;

    return this.router.navigate(["/trainees"], {
      queryParams: {
        active: snapshot.sort.active,
        direction: snapshot.sort.direction,
        pageIndex: snapshot.pageIndex,
        filter: snapshot.filter,
        ...(snapshot.searchQuery && { searchQuery: snapshot.searchQuery })
      }
    });
  }
}
