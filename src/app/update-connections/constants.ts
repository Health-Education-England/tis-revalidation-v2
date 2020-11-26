import { ActionType, IAction } from "./update-connections.interfaces";

export const CONNECTION_ACTIONS: IAction[] = [
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
