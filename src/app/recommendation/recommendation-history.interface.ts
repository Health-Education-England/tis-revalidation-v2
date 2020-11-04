export interface IRecommendationHistory {
  gmcNumber: number;
  fullName: string;
  cctDate: Date;
  programmeMembershipType: string;
  currentGrade: string;
  revalidations: IRecommendationSummary[];
  deferralReasons: DeferralReason[];
  underNotice: string;
  designatedBody: string;
  gmcSubmissionDate: Date;
}

export interface IRecommendationSummary {
  actualSubmissionDate: Date;
  admin: string;
  comments: string[];
  deferralComment: string;
  deferralDate: Date;
  deferralReason: number;
  deferralSubReason: number;
  gmcNumber: number;
  gmcOutcome: RecommendationGmcOutcome;
  gmcRevalidationId: string;
  gmcSubmissionDate: Date;
  recommendationId: string;
  recommendationStatus: RecommendationStatus;
  recommendationType: string; // RecommendationType;
}

export interface IComment {
  id: number;
  comment: string;
}

export interface INote {
  id: number;
  note: string;
}

export enum RecommendationStatus {
  NOT_STARTED = "Not started",
  STARTED = "Started",
  READY_TO_REVIEW = "Ready to review",
  READY_TO_SUBMIT = "Ready to submit",
  SUBMITTED_TO_GMC = "Submitted to GMC"
}

export enum RecommendationGmcOutcome {
  APPROVED = "Approved",
  REJECTED = "Rejected",
  UNDER_REVIEW = "Under Review"
}

export enum RecommendationType {
  REVALIDATE = "Revalidate",
  DEFER = "Defer",
  NON_ENGAGEMENT = "Non Engagement"
}

export interface DeferralReason {
  code: number;
  reason: string;
  subReasons: DeferralReason[] | any;
}

export const defaultRecommendation: IRecommendationSummary = {
  actualSubmissionDate: null,
  admin: null,
  comments: [],
  deferralComment: null,
  deferralDate: null,
  deferralReason: null,
  deferralSubReason: null,
  gmcNumber: null,
  gmcOutcome: null,
  gmcRevalidationId: null,
  gmcSubmissionDate: null,
  recommendationId: null,
  recommendationStatus: null,
  recommendationType: null
};
