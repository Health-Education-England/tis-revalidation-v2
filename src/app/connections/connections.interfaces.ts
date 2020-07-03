import { IGetRecordsResponse } from "../shared/records/records.interfaces";

// TODO subject to change once BE work is complete
export interface IGetConnectionsResponse extends IGetRecordsResponse {
  connectionsInfo: IConnection[];
}

// TODO subject to change once BE work is complete
export interface IConnection {
  currentConnection: string;
  checked?: boolean;
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

export enum ConnectionsFilterType {
  ADD_CONNECTION = "Add Connection",
  REMOVE_CONNECTION = "Remove Connection",
  EXCEPTIONS_QUEUE = "Exceptions Queue",
  ALL = "All",
  HIDDEN = "Hidden"
}
