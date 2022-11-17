const COLUMN_DATA_BASE: [string, string, boolean][] = [
  ["Programme", "programmeName", false],
  ["GMC Submission date", "submissionDate", true],
  ["Designated body", "designatedBody", false],
  ["Programme owner", "programmeOwner", false],
  ["Programme membership", "programmeMembershipType", false]
];

export const CURRENT_COLUMN_DATA: [string, string, boolean][] = [
  ...COLUMN_DATA_BASE
];

export const HISTORIC_COLUMN_DATA: [string, string, boolean][] = [
  ...COLUMN_DATA_BASE,
  ["Start date", "programmeMembershipStartDate", false],
  ["End date", "programmeMembershipEndDate", false]
];
