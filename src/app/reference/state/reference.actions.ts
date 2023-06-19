import { HttpErrorPayload } from "src/app/shared/services/error/error.service";
import { IDesignatedBody } from "../reference.interfaces";

export class GetDesignatedBodies {
  static readonly type = "[Reference] Get Designated Bodies";
}

export class GetSuccess {
  static readonly type = `[Reference] Get Designated Bodies Success`;
  constructor(public response: IDesignatedBody[]) {}
}

export class GetError extends HttpErrorPayload {
  static readonly type = `[Reference] Get Designated Bodies Error`;
}
