export interface IGetConcernResponse {
  concerns: IConcernSummary[];
  employers: IEntity[];
  gmcNumber: number;
  grades: IEntity[];
  sites: IEntity[];
  types: IEntity[];
  sources: IEntity[];
}

export interface IEntity {
  id: number;
  label: string;
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
  concernId?: string;
  concernType: IEntity;
  dateOfIncident: Date;
  dateReported: Date;
  employer: IEntity;
  followUpDate: Date;
  gmcNumber: number;
  grade: IEntity;
  lastUpdatedDate: Date;
  site: IEntity;
  source: IEntity;
  status: ConcernStatus;
}

export enum ConcernStatus {
  OPEN = "Open",
  CLOSED = "Closed"
}
