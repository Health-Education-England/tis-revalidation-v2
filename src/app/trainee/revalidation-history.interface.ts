export interface IRevalidationHistory {
  gmcId: string;
  traineeName: string;
  cctDate: Date;
  programmeMembershipType: string;
  currentGrade: string;
  recommendations: IRecommendation[];
}

export interface IRecommendation {
  Id: number;
  recommendation: string;
  outcome: string;
  gmcSubDueDate: Date;
  actSubDate: Date;
  submittedBy: string;
  submissionStatus: string;
  comments: IComment[];
  deferralReason?: string;
  deferralDate?: Date;

  // private String proposedOutcomeCode;
  // private String deferralDate;
  // private String deferralReason;
  // private String deferralComment;
  // private String revalidationStatusCode;
  // private String gmcSubmissionDateTime;
  // private String gmcSubmissionReturnCode;
  // private String gmcRecommendationId;
  // private String gmcOutcomeCode;
  // private String gmcStatusCheckDateTime;
  // private String admin;
  // private String submissionDate;
  // private String recommendationSubmitter;
  // private String dateAdded;
}

export interface IComment {
  id: number;
  comment: string;
}

export interface INote {
  id: number;
  note: string;
}
