export interface IConnectionResponse {
  programme: IProgramme;
  designatedBodyCode: IUserDBC;
  connection: {
    connectionHistory: IConnectionHistory[];
  };
}

export interface IUpdateConnectionResponse {
  message: string;
}

export interface IProgramme {
  gmcNumber: number;
  forenames: string;
  surname: string;
  curriculumEndDate: Date;
  programmeMembershipType: string;
  programmeName: string;
  currentGrade: string;
  programmeHistory: IProgrammeHistory[];
}

export interface IProgrammeHistory {
  designatedBodyCode: string;
  programmeMembershipType: string;
  programmeName: string;
  programmeOwner: string;
  programmeMembershipStartDate: Date;
  programmeMembershipEndDate: Date;
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
}

export interface IUserDBC {
  designatedBodyCode: string;
}
