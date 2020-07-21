import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { SnackBarService } from "../snack-bar/snack-bar.service";

@Injectable({
  providedIn: "root"
})
export class HttpErrorService {
  constructor(private snackBarService: SnackBarService) {}

  public handleHttpError(error: HttpErrorResponse): Observable<any> {
    const message = `${error.statusText}. Code: ${error.status}.`;
    this.snackBarService.openSnackBar(message);
    return throwError(message);
  }
}
