import { Params } from "@angular/router";

export class GetConcerns {
  static readonly type = `[Concerns] Get`;
  constructor(public payload: Params) {}
}
