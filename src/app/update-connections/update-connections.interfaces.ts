export enum ActionType {
  ADD_CONNECTION = "Add connection",
  REMOVE_CONNECTION = "Remove connection",
  HIDE_DISCREPANCY = "Hide discrepancy",
  SHOW_DISCREPANCY = "Show discrepancy"
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
  admin?: string;
}

export interface IHideDiscrepancyPayload {
  reason: string;
  hiddenForDesignatedBodyCode: string;
  doctors: IDoctor[];
  hiddenBy?: string;
}

export interface IDoctor {
  gmcId: number;
  currentDesignatedBodyCode: string;
  programmeOwnerDesignatedBodyCode?: string;
}
