import { IGetRecordsResponse } from "../records/records.interfaces";
import {
  RecommendationStatus,
  RecommendationGmcOutcome
} from "../recommendation/recommendation-history.interface";

export interface IRecommendation {
  admin: string;
  curriculumEndDate: string;
  checked?: boolean;
  dateAdded: string;
  designatedBody: string;
  doctorFirstName: string;
  doctorLastName: string;
  gmcOutcome: RecommendationGmcOutcome;
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
  recommendationInfo: IRecommendation[];
}

export interface IRecommendationsTableFilters {
  programmeName: string;
  gmcStatus: string;
}

export enum RecommendationsFilterType {
  UNDER_NOTICE = "underNotice",
  ALL_DOCTORS = "allDoctors"
}
