export interface IConnectionResponse {
  designatedBodyCode: IUserDBC;
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
  admin?: string;
}

export interface IUserDBC {
  designatedBodyCode: string;
}
