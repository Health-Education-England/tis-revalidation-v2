import { IRecommendationSummary } from "../recommendation-history.interface";

export class Get {
  static readonly type = "[recommendation] Get";
  constructor(public payload: number) {}
}

export class Set {
  static readonly type = "[recommendation] Set";
  constructor(public payload: IRecommendationSummary) {}
}

export class Add {
  static readonly type = "[recommendation] Add";
  constructor(public payload: IRecommendationSummary) {}
}

export class Post {
  static readonly type = "[recommendation] Post";
  constructor(
    public gmcNumber: number,
    public recommendationId: string,
    public designatedBody: string
  ) {}
}
