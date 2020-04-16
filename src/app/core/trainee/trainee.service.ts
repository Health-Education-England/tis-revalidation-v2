import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "@environment";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { TraineesStateModel } from "../../trainees/state/trainees.state";
import { IGetTraineesResponse } from "./trainee.interfaces";

@Injectable({
  providedIn: "root"
})
export class TraineeService {
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

  public updateTraineesRoute(): Promise<boolean> {
    const snapshot: TraineesStateModel = this.store.snapshot().trainees;

    return this.router.navigate(["/trainees"], {
      queryParams: {
        active: snapshot.sort.active,
        direction: snapshot.sort.direction,
        pageIndex: snapshot.pageIndex
      }
    });
  }
}
