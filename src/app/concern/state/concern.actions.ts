import { IConcernSummary } from "../concern.interfaces";

export class Get {
  static readonly type = "[Concern] Get";
  constructor(public payload: number) {}
}

export class Set {
  static readonly type = "[Concern] Set";
  constructor(public payload: IConcernSummary) {}
}

export class Add {
  static readonly type = "[Concern] Add";
  constructor(public payload: IConcernSummary) {}
}

export class Post {
  static readonly type = "[Concern] Post";
  constructor(public gmcNumber: number, public concernId: string) {}
}
