import { IGetRecordsResponse } from "../shared/records/records.interfaces";

// TO DO: to be defined
export interface IGetConcernsResponse extends IGetRecordsResponse {
  concernsInfo: any;
}

// TO DO: to be defined
export interface IConcern {
  doctorFirstName: string;
  doctorLastName: string;
  doctorStatus: string;
  gmcReferenceNumber: string;
  lastUpdatedDate: string;
}

export enum ConcernsFilterType {
  OPEN = "open",
  CLOSED = "closed"
}
