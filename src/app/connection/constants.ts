import { IAction } from "./connection.interfaces";

export enum ActionType {
  ADD_CONNECTION = "Add connection",
  REMOVE_CONNECTION = "Remove connection",
  REVIEW_CONNECTION = "Review connection",
  IGNORE_CONNECTION = "Ignore connection"
}

export const ACTIONS: IAction[] = [
  {
    action: ActionType.ADD_CONNECTION,
    reasons: [
      {
        reason: "The doctor has a connection with this designated body",
        code: "1"
      },
      { reason: "Conflict of interest", code: "2" }
    ]
  },
  {
    action: ActionType.REMOVE_CONNECTION,
    reasons: [
      { reason: "Conflict of interest", code: "1" },
      { reason: "Doctor has retired", code: "2" },
      {
        reason:
          "The doctor does not have a connection with this designated body",
        code: "3"
      }
    ]
  }
];

export const ADMIN_ROLES = [
  "RevalSuperAdmin",
  "RevalTISAdmin1",
  "RevalTISAdmin2"
];
