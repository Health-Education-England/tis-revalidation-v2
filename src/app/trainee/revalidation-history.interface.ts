export interface IRevalidationHistory {
  gmcNumber: string;
  fullName: string;
  cctDate: Date;
  programmeMembershipType: string;
  currentGrade: string;
  revalidations: IRevalidation[];
  deferralReasons: DeferralReason[];
}

export interface IRevalidation {
  actualSubmissionDate: Date;
  admin: string;
  deferralComment: string;
  deferralDate: Date;
  deferralReason: number;
  gmcOutcome: RevalidationGmcOutcome;
  gmcRevalidationId: number;
  gmcSubmissionDate: Date;
  revalidationStatus: RevalidationStatus;
  recommendationType: RecommendationType;
  comments: string[];
  deferralSubReason: number;
  gmcNumber: number;
  recommendationId: string;
}

export interface IComment {
  id: number;
  comment: string;
}

export interface INote {
  id: number;
  note: string;
}

export enum RevalidationStatus {
  NOT_STARTED = "Not started",
  STARTED = "Started",
  READY_TO_REVIEW = "Ready to review",
  READY_TO_SUBMIT = "Ready to submit",
  SUBMITTED_TO_GMC = "Submitted to GMC"
}

export enum RevalidationGmcOutcome {
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
