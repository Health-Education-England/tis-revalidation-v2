import { RecommendationStatus } from "../recommendation/recommendation-history.interface";

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

export interface IRecommendationsResponse {
  countTotal: number;
  countUnderNotice: number;
  traineeInfo: IRecommendation[];
  totalResults: number;
  totalPages: number;
}
