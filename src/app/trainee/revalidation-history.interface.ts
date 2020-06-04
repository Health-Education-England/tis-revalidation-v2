export interface IRevalidationHistory {
  gmcNumber: string;
  fullName: string;
  cctDate: Date;
  programmeMembershipType: string;
  currentGrade: string;
  revalidations: IRevalidation[];
  deferralReasons: DeferralReason[];
  underNotice: string;
}

export interface IRevalidation {
  actualSubmissionDate: Date;
  admin: string;
  comments: string[];
  deferralComment: string;
  deferralDate: Date;
  deferralReason: number;
  deferralSubReason: number;
  gmcNumber: number;
  gmcOutcome: RecommendationGmcOutcome;
  gmcRevalidationId: string; // check type with back-end
  gmcSubmissionDate: Date;
  recommendationId: string;
  recommendationStatus: RecommendationStatus;
  recommendationType: RecommendationType;
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
