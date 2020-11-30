export enum ActionType {
  ADD_CONNECTION = "Add connection",
  REMOVE_CONNECTION = "Remove connection",
  REVIEW_CONNECTION = "Review connection",
  IGNORE_CONNECTION = "Ignore connection"
}

export interface IAction {
  action: ActionType;
  reasons: IReason[];
}

export interface IReason {
  code: string;
  reason: string;
}
