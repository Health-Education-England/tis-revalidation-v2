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

export interface ITraineeResponse {
  traineeInfo: ITrainee[];
  countTotal: number;
  countUnderNotice: number;
  totalPages: number;
}

export interface ITraineeDataCell {
  label: string;
  name: string;
  enableSort: boolean;
}

export interface ITraineeRouteParams {
  sortColumn?: string;
  sortOrder?: string;
  pageNumber?: number;
  underNotice?: boolean; // maybe string[] for multiple
  search?: string;
}

export const DefaultRouteParams: ITraineeRouteParams = {
  sortColumn: "submissionDate",
  sortOrder: "desc",
  pageNumber: 0,
  underNotice: null,
  search: null
};
