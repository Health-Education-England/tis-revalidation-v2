import { IGetRecordsResponse } from "../shared/records/records.interfaces";
import { RecommendationStatus } from "../trainee/revalidation-history.interface";

export interface IRecommendation {
  admin: string;
  cctDate: string;
  dateAdded: string;
  doctorFirstName: string;
  doctorLastName: string;
  doctorStatus: RecommendationStatus;
  gmcReferenceNumber: string;
  lastUpdatedDate: string;
  programmeMembershipType: string;
  programmeName: string;
  sanction: string;
  submissionDate: string;
  underNotice: string;
}

export interface IGetRecommendationsResponse extends IGetRecordsResponse {
  countTotal: number;
  countUnderNotice: number;
  traineeInfo: IRecommendation[];
}

export enum RecommendationsFilterType {
  UNDER_NOTICE = "underNotice",
  ALL_DOCTORS = "allDoctors"
}
