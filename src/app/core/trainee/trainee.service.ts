import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environment";
import { Observable } from "rxjs";
import { ITrainee } from "./trainee.interfaces";

@Injectable({
  providedIn: "root"
})
export class TraineeService {
  constructor(private http: HttpClient) {}

  public getUnderNoticeTrainees(): Observable<ITrainee[]> {
    return this.http.get<ITrainee[]>(
      `${environment.host}${environment.appUrls.getUnderNoticeTrainees}`
    );
  }
}
