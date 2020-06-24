import { Params } from "@angular/router";

export class GetRecommendations {
  static readonly type = `[Recommendations] Get`;
  constructor(public payload: Params) {}
}
