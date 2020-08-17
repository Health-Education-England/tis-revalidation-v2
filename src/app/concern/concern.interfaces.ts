export interface IGetConcernResponse {
  concerns: IConcernSummary[];
  employers: IEmployer[];
  gmcNumber: number;
  grades: IGrade[];
  sites: ISite[];
  types: IConcernType[];
  sources: ISource[];
}

export interface IEntity {
  id: number;
  label: string;
}

/**
 * TODO ask BE to uniform the return types so that
 * `types, sources, sites, grades and employers' are the same i.e `ReferenceDto` in the BE
 * this will help clean up the below interfaces as well as not needing `IAddConcernRequest`
 */
export interface IConcernType extends IEntity {
  code: string;
}

export interface ISource {
  id: number;
  name: string;
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
  concernId?: number;
  concernType: IConcernType;
  dateOfIncident: Date;
  dateReported: Date;
  employer: IEmployer;
  followUpDate: Date;
  gmcNumber: number;
  grade: IGrade;
  lastUpdatedDate: Date;
  site: ISite;
  source: ISource;
  status: ConcernStatus;
}

export interface IAddConcernRequest {
  admin: string;
  comments: string[];
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
