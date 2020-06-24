export const COLUMN_DATA: any[][] = [
  ["First name", "doctorFirstName", true],
  ["Last name", "doctorLastName", true],
  ["GMC No", "gmcReferenceNumber", false],
  ["GMC Submission due date", "submissionDate", true],
  ["Status", "doctorStatus", false],
  ["Programme name", "programmeName", false],
  ["Programme membership type", "programmeMembershipType", false],
  ["CCT date", "cctDate", true],
  ["Admin", "admin", false],
  ["Last updated", "lastUpdatedDate", true]
];

export const DEFAULT_PARAMS = {
  sortColumn: "submissionDate",
  sortOrder: "desc",
  pageNumber: 0,
  underNotice: null,
  allDoctors: null
};

export const DATE_COLUMNS = [
  "cctDate",
  "submissionDate",
  "dateAdded",
  "lastUpdatedDate"
];

export const PARAM_KEYS = [
  "sortColumn",
  "sortOrder",
  "pageNumber",
  "underNotice",
  "allDoctors"
];
