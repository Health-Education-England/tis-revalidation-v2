export interface IRevalidationHistory {
  gmcNumber: string;
  fullName: string;
  cctDate: Date;
  programmeMembershipType: string;
  currentGrade: string;
  revalidations: IRevalidation[];
}

export interface IRevalidation {
  actualSubmissionDate: Date;
  admin: string;
  deferralComment: string;
  deferralDate: Date;
  deferralReason: Date;
  gmcOutcome: RevalidationGmcOutcome;
  gmcRevalidationId: number;
  gmcSubmissionDate: Date;
  revalidationStatus: RevalidationStatus;
  revalidationType: RevalidationType;
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
  UNDER_REVIEW = "Under review"
}
export enum RevalidationType {
  REVALIDATE = "Revalidate",
  DEFER = "Defer",
  NON_ENGAGEMENT = "Non Engagement"
}
