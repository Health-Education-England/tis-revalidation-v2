import { IGetRecordsResponse } from "../shared/records/records.interfaces";

// TODO subject to change once BE work is complete
export interface IGetConnectionsResponse extends IGetRecordsResponse {
  connectionsInfo: IConnection[];
}

// TODO subject to change once BE work is complete
export interface IConnection {
  currentConnection: string;
  designatedBody: string;
  doctorFirstName: string;
  doctorLastName: string;
  endDate: string;
  gmcReferenceNumber: string;
  gmcSubmissionDate: string;
  programmeMembership: string;
  programmeName: string;
  programmeOwner: string;
  startDate: string;
}
