import { Sort } from "@angular/material/sort";

export const COLUMN_DATA: [string, string, boolean][] = [
  ["GMC Submission due date", "submissionDate", true],
  ["GMC Status", "gmcOutcome", false],
  ["TIS Status", "doctorStatus", false],
  ["Programme name", "programmeName", false],
  ["Programme membership type", "programmeMembershipType", false],
  ["Curriculum end date", "curriculumEndDate", false],
  ["Admin", "admin", false],
  ["Last updated", "lastUpdatedDate", false]
];

export const RECOMMENDATION_SORT: Sort = {
  active: "submissionDate",
  direction: "asc"
};

export const DEFERRAL_MIN_DAYS = 120;
export const DEFERRAL_MAX_DAYS = 365;
export const DEFERRAL_PERMITTED_MAX_DAYS = 120;
