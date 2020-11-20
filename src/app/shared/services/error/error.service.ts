import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ErrorService {
  public generateErrorMsg(error: HttpErrorResponse): string {
    return error.status === 200
      ? error.error.text
      : error.error instanceof ErrorEvent || error.status === 406
      ? `Error: ${error.error.message || error.error[0]}`
      : `Error Code: ${error.status}. ${error.statusText}`;
  }
}

export class HttpErrorPayload {
  constructor(public error: string) {}
}
