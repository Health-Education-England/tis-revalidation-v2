import {
  AutocompleteControl,
  FormControlBase,
  FormControlType
} from "../shared/form-controls/form-contol-base.model";
export const COLUMN_DATA: [string, string, boolean][] = [
  ["Current programme name", "programmeName", false],
  ["GMC Submission date", "submissionDate", false],
  ["GMC Designated body", "designatedBody", true],
  ["Programme owner", "tcsDesignatedBody", true],
  ["Programme membership", "programmeMembershipType", false]
];
export const EXCEPTIONSLOG_COLUMN_DATA: { name: string; label: string }[] = [
  { name: "timestamp", label: "Date/time" },
  { name: "gmcId", label: "GMC Number" },
  { name: "errorMessage", label: "Error message" }
];

export const TABLE_FILTERS_FORM_BASE: Array<
  FormControlBase | AutocompleteControl
> = [
  {
    key: "programmeName",
    label: "Programme name",
    order: 1,
    controlType: FormControlType.AUTOCOMPLETE,
    placeholder: "Start typing..."
  }
];
