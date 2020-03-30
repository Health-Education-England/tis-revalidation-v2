export interface PeriodicElement {
  recommendation: string;
  episodeId: number;
  outcome: string; // enum from GMC table
  gmcSubDueDate: string;
  ActSubDate: string;
  submittedBy: string;
  submissionStatus: string;
  comments: string[];
}
