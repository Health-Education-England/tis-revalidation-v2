export interface IGetConcernsResponse {
  concernTrainees: IConcern[];
  countTotal: number;
  totalPages: number;
  totalResults: number;
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
