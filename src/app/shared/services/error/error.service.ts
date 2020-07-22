import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ErrorService {
  public generateErrorMsg(error: HttpErrorResponse): string {
    let message: string;

    if (error.error instanceof ErrorEvent) {
      // client-side error
      message = `Error: ${error.error.message}`;
    } else {
      // server-side error
      message = `Error Code: ${error.status}. ${error.statusText}`;
    }

    return message;
  }
}

export class HttpErrorPayload {
  constructor(public error: string) {}
}
