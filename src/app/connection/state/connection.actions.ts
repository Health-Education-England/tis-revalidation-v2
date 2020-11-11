import { HttpErrorPayload } from "../../shared/services/error/error.service";
import { IConnectionDetails } from "../connection.interfaces";

export class Get {
  static readonly type = "[Connection] Get";
  constructor(public payload: number) {}
}
