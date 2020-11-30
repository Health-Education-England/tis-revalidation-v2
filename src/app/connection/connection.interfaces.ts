export interface IConnectionResponse {
  connection: IConnectionDetails;
  designatedBodyCode: IUserDBC;
}

export interface IConnectionDetails {
  gmcNumber: number;
  forenames: string;
  surname: string;
  cctDate: Date;
  programmeMembershipType: string;
  programmeName: string;
  currentGrade: string;
  connectionHistory: IConnectionHistory[];
}

export interface IConnectionHistory {
  programmeMembershipType: string;
  programmeName: string;
  programmeOwner: string;
  connectionStatus: string;
  designatedBodyCode: string;
  programmeMembershipStartDate: Date;
  programmeMembershipEndDate: Date;
}

export interface IUserDBC {
  designatedBodyCode: string;
}
