export interface IGetConcernResponse {
  gmcNumber: number;
  concerns: IConcernSummary[];
}
export interface IConcernSummary {
  admin: string;
  comments: string[];
  concernId: number;
  concernType: string; // TODO: use enum ConcernType
  dateOfIncident: Date;
  dateReported: Date;
  employer: string;
  followUpDate: Date;
  gmcNumber: number;
  grade: string;
  lastUpdatedDate: Date;
  site: string;
  source: string;
  status: ConcernStatus;
}
export enum ConcernStatus {
  OPEN = "Open",
  CLOSED = "closed"
}

// TODO: fill out types of concerns
export enum ConcernType {}
