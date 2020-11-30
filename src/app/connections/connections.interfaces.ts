import { IGetRecordsResponse } from "../records/records.interfaces";
import { IDesignatedBody } from "../reference/reference.interfaces";

export interface IGetConnectionsResponse extends IGetRecordsResponse {
  connections: IConnection[];
  dbcs: IDesignatedBody[];
}

export interface IConnection {
  checked?: boolean;
  connectionStatus: string;
  designatedBody: string;
  doctorFirstName: string;
  doctorLastName: string;
  gmcReferenceNumber: string;
  programmeMembershipEndDate: string;
  programmeMembershipStartDate: string;
  programmeMembershipType: string;
  programmeName: string;
  programmeOwner: string;
  submissionDate: string;
}

export enum ConnectionsFilterType {
  ADD_CONNECTION = "addConnection",
  REMOVE_CONNECTION = "removeConnection",
  EXCEPTIONS_QUEUE = "exceptionsQueue",
  ALL = "all",
  HIDDEN = "hidden"
}
