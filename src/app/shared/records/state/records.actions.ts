import { HttpErrorResponse } from "@angular/common/http";

export class GetSuccessPayload<T> {
  constructor(public response: T) {}
}

export class GetErrorPayload {
  constructor(public error: HttpErrorResponse) {}
}
