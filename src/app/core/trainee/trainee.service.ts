import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "@environment";
import { Observable } from "rxjs";
import { IGetTraineesResponse } from "./trainee.interfaces";

@Injectable({
  providedIn: "root"
})
export class TraineeService {
  constructor(private http: HttpClient) {}

  public getTrainees(params?: HttpParams): Observable<IGetTraineesResponse> {
    return this.http.get<IGetTraineesResponse>(
      `${environment.appUrls.getTrainees}`,
      { params }
    );
  }
}
