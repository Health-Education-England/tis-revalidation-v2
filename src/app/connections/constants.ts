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
    order: 2,
    controlType: FormControlType.AUTOCOMPLETE,
    placeholder: "Start typing..."
  },
  {
    pageFilters: ["hidden", "discrepancies"],
    key: "gmcStatus",
    label: "Designated body connection status",
    order: 1,
    controlType: FormControlType.RADIO,
    options: [
      {
        key: "connected",
        value: "Connected"
      },
      {
        key: "disconnected",
        value: "Disconnected"
      }
    ],
    initialValue: []
  },
  {
    key: "submissionDateStart",
    label: "Submission start date",
    order: 3,
    controlType: FormControlType.DATE_PICKER
  },
  {
    key: "submissionDateEnd",
    label: "Submission end date",
    order: 4,
    controlType: FormControlType.DATE_PICKER
  }
];
