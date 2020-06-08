import { IGetRecordsResponse } from "../shared/records/records.interfaces";

export interface IGetConcernsResponse extends IGetRecordsResponse {
  concernTrainees: IConcern[];
}

export interface IConcern {
  admin: string;
  closedDate: string;
  concernsStatus: string;
  dateAdded: string;
  dateRaised: string;
  doctorFirstName: string;
  doctorLastName: string;
  followUpDate: string;
  gmcReferenceNumber: string;
  programme: string;
  site: string;
  source: string;
  status: string;
  type: string;
}

export enum ConcernsFilterType {
  OPEN = "Open",
  CLOSED = "Closed"
}
