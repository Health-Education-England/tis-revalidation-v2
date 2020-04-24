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

export interface IGetTraineesResponse {
  countTotal: number;
  countUnderNotice: number;
  totalResults: number;
  totalPages: number;
  traineeInfo: ITrainee[];
}

export interface ITraineeDataCell {
  label: string;
  name: string;
  enableSort: boolean;
}

export enum TraineesFilterType {
  UNDER_NOTICE = "underNotice",
  ALL_DOCTORS = "allDoctors"
}
