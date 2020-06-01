import { IGetRecordsResponse } from "../shared/records/records.interfaces";

export interface IGetConcernsResponse extends IGetRecordsResponse {
  concernsInfo: IConcern[];
}

export interface IConcern {
  admin: string;
  closedDate: string;
  dateRaised: string;
  doctorFirstName: string;
  doctorLastName: string;
  followUpDate: string;
  gmcReferenceNumber: string;
  programmeNumber: string;
  site: string;
  source: string;
  status: string;
  type: string;
}

export enum ConcernsFilterType {
  OPEN = "Open",
  CLOSED = "Closed"
}
