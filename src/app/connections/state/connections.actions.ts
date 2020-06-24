import { Params } from "@angular/router";

export class GetConnections {
  static readonly type = `[Connections] Get`;
  constructor(public payload: Params) {}
}
