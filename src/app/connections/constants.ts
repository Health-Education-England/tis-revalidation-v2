import {
  AutocompleteControl,
  FormControlBase,
  FormControlType
} from "../shared/form-controls/form-contol-base.model";
export const COLUMN_DATA: [string, string, boolean][] = [
  ["Current programme name", "programmeName", true],
  ["GMC Submission date", "submissionDate", true],
  ["GMC Designated body", "designatedBody", true],
  ["TIS Designated body", "tcsDesignatedBody", true],
  ["Programme owner", "programmeOwner", true],
  ["Programme membership", "programmeMembershipType", true]
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
