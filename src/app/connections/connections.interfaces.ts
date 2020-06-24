// TODO subject to change once BE work is complete
export interface IGetConnectionsResponse {
  connectionsInfo: IConnection[];
  countTotal: number;
  totalPages: number;
  totalResults: number;
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

export enum ConnectionsFilterType {
  ADD_CONNECTION = "Add Connection",
  REMOVE_CONNECTION = "Remove Connection",
  EXCEPTIONS_QUEUE = "Exceptions Queue",
  ALL = "All",
  HIDDEN = "Hidden"
}
