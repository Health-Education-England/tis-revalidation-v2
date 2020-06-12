export class AddRecommendationNote {
  static readonly type = "[RecommendationNotes] Add item";
  constructor(public payload: string) {}
}

export class EditRecommendationNote {
  static readonly type = "[RecommendationNotes] Edit item";
  constructor(public payload: string) {}
}

export class GetRecommendationNotes {
  static readonly type = "[RecommendationNotes] Get";
  constructor(public payload: number) {}
}
