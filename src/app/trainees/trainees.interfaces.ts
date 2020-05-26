import { IGetRecordsResponse } from "../shared/records/records.interfaces";

export interface ITrainee {
  admin: string;
  cctDate: string;
  dateAdded: string;
  doctorFirstName: string;
  doctorLastName: string;
  doctorStatus: string;
  gmcReferenceNumber: string;
  lastUpdatedDate: string;
  programmeMembershipType: string;
  programmeName: string;
  sanction: string;
  submissionDate: string;
  underNotice: string;
}

export interface IGetTraineesResponse extends IGetRecordsResponse {
  countTotal: number;
  countUnderNotice: number;
  traineeInfo: ITrainee[];
}

export enum TraineesFilterType {
  UNDER_NOTICE = "underNotice",
  ALL_DOCTORS = "allDoctors"
}
