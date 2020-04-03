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
  traineeInfo: ITrainee[];
  count: number;
}

export interface ITraineeDataCell {
  label: string;
  name: string;
  enableSort: boolean;
}
