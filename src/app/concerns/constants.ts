export const COLUMN_DATA: any[][] = [
  ["First name", "doctorFirstName", true],
  ["Last name", "doctorLastName", true],
  ["Programme", "programme", false],
  ["Date raised", "dateRaised", false],
  ["Type", "type", false],
  ["Site", "site", false],
  ["Source", "source", false],
  ["Status", "status", false],
  ["Admin", "admin", false],
  ["Follow-up date", "followUpDate", false],
  ["Closed date", "closedDate", false]
];

// TODO: revise constants to match exact data
export const DEFAULT_PARAMS = {
  sortColumn: "submissionDate",
  sortOrder: "desc",
  pageNumber: 0,
  concernsStatus: null
};

export const DATE_COLUMNS = [
  "closedDate",
  "dateRaised",
  "dateAdded",
  "followUpDate"
];

export const PARAM_KEYS = [
  "sortColumn",
  "sortOrder",
  "pageNumber",
  "concernsStatus"
];
