export interface IGetConcernResponse {
  concerns: IConcernSummary[];
  employers: IEmployer[];
  gmcNumber: number;
  grades: IGrade[];
  sites: ISite[];
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
  abbreviation: string;
  id: number;
  intrepidId: string;
  label: string;
  name: string;
  placementGrade: boolean;
  postGrade: boolean;
  status: string;
  trainingGrade: boolean;
}

export interface ISite {
  address: string;
  endDate: string;
  id: number;
  intrepidId: number;
  localOffice: string;
  organisationalUnit: string;
  postCode: string;
  siteCode: string;
  siteKnownAs: string;
  siteName: string;
  siteNumber: number;
  startDate: string;
  status: string;
  trustCode: string;
  trustId: number;
}

export interface IEmployer {
  address: string;
  code: string;
  id: number;
  intrepidId: string;
  localOffice: string;
  postCode: string;
  status: string;
  trustKnownAs: string;
  trustName: string;
  trustNumber: string;
}
