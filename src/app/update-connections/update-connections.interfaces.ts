export enum ActionType {
  ADD_CONNECTION = "Add connection",
  REMOVE_CONNECTION = "Remove connection",
  HIDE_CONNECTION = "Hide connection",
  UNHIDE_CONNECTION = "Unhide connection"
}

export interface IAction {
  action: ActionType;
  reasons: IReason[];
}

export interface IReason {
  code: string;
  reason: string;
}

export interface IUpdateConnection {
  changeReason: string;
  designatedBodyCode: string;
  doctors: IDoctor[];
}

export interface IDoctor {
  gmcId: number;
  currentDesignatedBodyCode: string;
}
