import { IConcernSummary } from "../concern-history.interface";

export class Get {
  static readonly type = "[concern] Get";
  constructor(public payload: number) {}
}

export class Set {
  static readonly type = "[concern] Set";
  constructor(public payload: IConcernSummary) {}
}

export class Add {
  static readonly type = "[concern] Add";
  constructor(public payload: IConcernSummary) {}
}

export class Post {
  static readonly type = "[concern] Post";
  constructor(public gmcNumber: number, public concernId: string) {}
}
