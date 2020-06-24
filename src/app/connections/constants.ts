export const COLUMN_DATA: any[][] = [
  ["First name", "doctorFirstName", true],
  ["Last name", "doctorLastName", true],
  ["Programme name", "programmeName", false],
  ["GMC Submission date", "submissionDate", false],
  ["Designated body", "designatedBody", false],
  ["Programme owner", "programmeOwner", false],
  ["Programme membership", "programmeMembership", false],
  ["Current connection", "currentConnection", false],
  ["Start date", "startDate", false],
  ["End date", "endDate", false]
];

// TODO: revise constants to match exact data
export const DEFAULT_PARAMS = {
  sortColumn: "submissionDate",
  sortOrder: "desc",
  pageNumber: 0
};

export const DATE_COLUMNS = [
  "closedDate",
  "dateRaised",
  "dateAdded",
  "followUpDate"
];

export const PARAM_KEYS = ["sortColumn", "sortOrder", "pageNumber"];
