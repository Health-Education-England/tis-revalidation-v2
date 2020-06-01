import { Sort } from "@angular/material/sort";

export const DEFAULT_SORT: Sort = {
  active: "gmcSubmissionDate",
  direction: "desc"
};

export const COLUMN_DATA: any[][] = [
  ["Programme name", "programmeName", false],
  ["GMC Submission date", "gmcSubmissionDate", false],
  ["Designated body", "designatedBody", false],
  ["Programme owner", "programmeOwner", false],
  ["Programme membership", "programmeMembership", false],
  ["Current connection", "currentConnection", false],
  ["Start date", "startDate", false],
  ["End date", "endDate", false]
];
