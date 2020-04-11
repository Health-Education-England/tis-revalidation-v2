import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { ITraineeResponse } from "./trainees.interface";
import { environment } from "@environment";
import { TraineesStateModel } from "./state/trainees.state";

@Injectable({
  providedIn: "root"
})
export class TraineesService {
  public AllTrainees: TraineesStateModel;
  public TraineesUnderNotice: TraineesStateModel;

  constructor(private http: HttpClient) {}

  getTrainees(params?: HttpParams): Observable<ITraineeResponse> {
    return this.http.get<ITraineeResponse>(
      `${environment.appUrls.getTrainees}`,
      { params }
    );
  }
}
