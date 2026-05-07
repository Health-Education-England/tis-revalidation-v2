export interface IConnectionResponse {
  designatedBodyCode: IUserDBC;
  hiddenDiscrepancies?: IHiddenDiscrepancy[];
  connection: {
    connectionHistory: IConnectionHistory[];
  };
}

export interface IUpdateConnectionResponse {
  message: string;
}

export interface IConnectionHistory {
  connectionId: string;
  gmcId: string;
  gmcClientId: string;
  newDesignatedBodyCode: string;
  previousDesignatedBodyCode: string;
  reason: string;
  reasonMessage: string;
  requestType: string;
  requestTime: Date;
  responseCode: string;
  responseMessage: string;
  updatedBy: string;
}

export interface IUserDBC {
  designatedBodyCode: string;
}

export interface IHiddenDiscrepancy {
  id: string;
  gmcId: string;
  hiddenForDesignatedBodyCode: string;
  hiddenBy: string;
  reason: string;
  hiddenDateTime: string;
}

export interface IShowDiscrepancyParameters {
  discrepancyId: string;
  hiddenForDesignatedBodyCode: string;
}
