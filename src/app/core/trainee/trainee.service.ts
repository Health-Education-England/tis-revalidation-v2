import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environment";
import { Observable } from "rxjs";
import { IUnderNoticeResponse } from "./trainee.interfaces";

@Injectable({
  providedIn: "root"
})
export class TraineeService {
  constructor(private http: HttpClient) {}

  public getUnderNoticeTrainees(): Observable<IUnderNoticeResponse> {
    return this.http.get<IUnderNoticeResponse>(
      `${environment.host}${environment.appUrls.getUnderNoticeTrainees}`
    );
  }
}
