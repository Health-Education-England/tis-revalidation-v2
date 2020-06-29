import { Interface } from "readline";

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
