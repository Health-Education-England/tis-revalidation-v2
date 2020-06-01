import { Sort } from "@angular/material/sort";

export const DEFAULT_SORT: Sort = {
  active: "submissionDate",
  direction: "desc"
};

export const COLUMN_DATA: any[][] = [
  ["GMC Submission due date", "submissionDate", true],
  ["Status", "doctorStatus", false],
  ["Programme name", "programmeName", false],
  ["Programme membership type", "programmeMembershipType", false],
  ["CCT date", "cctDate", true],
  ["Admin", "admin", false],
  ["Last updated", "lastUpdatedDate", true]
];
