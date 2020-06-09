import { IRevalidation } from "../revalidation-history.interface";

export class RevalidationHistoryAction {
  static readonly type = "[RevalidationHistory] Get";
  constructor(public payload: number) {}
}

export class SaveRevalidationHistory {
  static readonly type = "[saveRevalidationHistory] Set";
  constructor(public payload: IRevalidation) {}
}

export class AddRevalidationHistory {
  static readonly type = "[AddRevalidationHistory] Add";
  constructor(public payload: IRevalidation) {}
}

export class SubmitRevalidationHistoryToGMC {
  static readonly type = "[submitRevalidationHistoryToGMC] Post";
  constructor(public gmcId: number, public recommendationId: string) {}
}
