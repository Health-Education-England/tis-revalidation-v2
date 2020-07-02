export interface IConcernHistory {
  gmcNumber: number;
  concerns: IConcernSummary[];
}
export interface IConcernSummary {
  concernId: number;
  gmcNumber: number;
  dateOfIncident: Date;
  concernType: string; // TODO: use enum ConcernType
  source: string;
  dateReported: Date;
  employer: string;
  site: string;
  grade: string;
  status: ConcernStatus;
  admin: string;
  followUpDate: Date;
  lastUpdatedDate: Date;
  comments: string[];
}
export enum ConcernStatus {
  OPEN = "Open",
  CLOSED = "closed"
}

// TODO: fill out types of concerns
export enum ConcernType {}

export const defaultConcern: IConcernSummary = {
  concernId: null,
  gmcNumber: null,
  dateOfIncident: null,
  concernType: null,
  source: null,
  dateReported: null,
  employer: null,
  site: null,
  grade: null,
  status: null,
  admin: null,
  followUpDate: null,
  lastUpdatedDate: null,
  comments: []
};
