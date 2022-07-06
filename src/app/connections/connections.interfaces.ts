import { IGetRecordsResponse } from "../records/records.interfaces";

export interface IGetConnectionsResponse extends IGetRecordsResponse {
  connections: IConnection[];
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
  tcsDesignatedBody: string;
}

export enum ConnectionsFilterType {
  HISTORIC_CONNECTIONS = "historicConnections",
  CURRENT_CONNECTIONS = "currentConnections",
  DISCREPENCIES = "discrepencies",
  ALL = "all",
  HIDDEN = "hidden"
}
