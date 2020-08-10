export interface IGetConcernResponse {
  gmcNumber: number;
  concerns: IConcernSummary[];
}

export interface IListFile {
  bucketName: string;
  fileName: string;
  fileType: string;
  key: string;
}

export interface IFileUploadProgress {
  file: File;
  progress?: number;
}

export interface IConcernSummary {
  admin: string;
  comments: string[];
  concernId: number;
  concernType: string; // TODO: use enum IncidentType, check with BE
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
  CLOSED = "Closed"
}

export interface IncidentType {
  code: string;
  label: string;
}

export interface IGrade {
  gradeId: number;
  gradeName: string;
}

export interface ISite {
  siteId: number;
  siteName: string;
}

export interface IEmployer {
  employerId: number;
  employerName: string;
}
