import {
  AutocompleteControl,
  FormControlBase,
  FormControlType
} from "../shared/form-controls/form-contol-base.model";
export const COLUMN_DATA: [string, string, boolean][] = [
  ["Current programme name", "programmeName", false],
  ["GMC Submission date", "submissionDate", false],
  ["GMC Designated body", "designatedBody", false],
  ["TIS Designated body", "tcsDesignatedBody", false],
  ["Programme owner", "programmeOwner", false],
  ["Programme membership", "programmeMembershipType", false]
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
