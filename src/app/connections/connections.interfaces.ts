import {
  IGetRecordsResponse,
  ITableFilters
} from "../records/records.interfaces";

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
  DISCREPANCIES = "discrepancies",
  ALL = "all",
  HIDDEN = "hidden",
  EXCEPTIONSLOG = "exceptionsLog"
}

export interface IConnectionsTableFilters extends ITableFilters {
  programmeName?: string;
  tisDesignatedBodies?: string | string[];
  dbcs?: string | string[];
  programmeEndDateStart?: string;
  programmeEndDateEnd?: string;
}
