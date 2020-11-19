export interface IConnectionResponse {
  connection: IConnectionDetails;
  dbcs: IDesignatedBody[];
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

export interface IDesignatedBody {
  id: number;
  dbc: string;
  name: string;
  abbr: string;
  status: string;
}

export interface IUserDBC {
  designatedBodyCode: string;
}
