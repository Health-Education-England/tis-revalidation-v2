import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { environment } from "@environment";
import { IException } from "../exceptions-log.interface";
import { AuthService } from "src/app/core/auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class ExceptionsLogService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getExceptions(): Observable<IException[]> {
    const params: HttpParams = new HttpParams().set(
      "admin",
      this.authService.userName
    );

    return this.http
      .get<IException[]>(`${environment.appUrls.getExceptionsLog}`, {
        params
      })
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error));
        })
      );
  }
}
