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
  CURRENT_CONNECTIONS = "currentConnections",
  DISCREPANCIES = "discrepancies",
  HIDDEN_DISCREPANCIES = "hiddenDiscrepancies",
  EXCEPTIONSLOG = "exceptionsLog"
}

export interface IConnectionsTableFilters extends ITableFilters {
  programmeName?: string;
  tisDesignatedBodies?: string | string[];
  dbcs?: string | string[];
  membershipEndDateFrom?: string;
  membershipEndDateTo?: string;
  submissionDateFrom?: string;
  submissionDateTo?: string;
  lastConnectionDateTimeFrom?: string;
  lastConnectionDateTimeTo?: string;
  updatedBy?: string;
}
