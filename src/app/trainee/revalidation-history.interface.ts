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
  ActSubDate: Date;
  submittedBy: string;
  submissionStatus: string;
  comments: IComment[];
}

export interface IComment {
  id: number;
  comment: string;
}

export interface INote {
  id: number;
  note: string;
}
