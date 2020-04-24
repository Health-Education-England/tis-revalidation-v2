export class AddRevalidationNote {
  static readonly type = "[RevalidationNotes] Add item";
  constructor(public payload: string) {}
}

export class EditRevalidationNote {
  static readonly type = "[RevalidationNotes] Edit item";
  constructor(public payload: string) {}
}

export class GetRevalidationNotes {
  static readonly type = "[RevalidationNotes] Get";
  constructor(public payload: number) {}
}
