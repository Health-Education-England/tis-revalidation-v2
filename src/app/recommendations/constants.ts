import { Sort } from "@angular/material/sort";
import {
  FormControlBase,
  AutocompleteControl
} from "../shared/form-controls/form-contol-base.model";

export const COLUMN_DATA: [string, string, boolean][] = [
  ["GMC Submission due date", "submissionDate", true],
  ["GMC Status", "gmcOutcome", false],
  ["TIS Status", "doctorStatus", false],
  ["Programme name", "programmeName", false],
  ["Programme membership type", "programmeMembershipType", false],
  ["Curriculum end date", "curriculumEndDate", false],
  ["Admin", "admin", false],
  ["Last updated", "lastUpdatedDate", false]
];

export const RECOMMENDATION_SORT: Sort = {
  active: "submissionDate",
  direction: "asc"
};

export const DEFERRAL_MIN_DAYS = 120;
export const DEFERRAL_MAX_DAYS = 365;
export const DEFERRAL_PERMITTED_MAX_DAYS = 120;

export const TABLE_FILTERS_FORM_BASE: Array<
  FormControlBase | AutocompleteControl
> = [
  {
    key: "programmeName",
    label: "Programme name",
    order: 1,
    controlType: "autocomplete",
    placeholder: "Start typing..."
  }
];

export const TABLE_FILTERS_FORM_DBC: FormControlBase = {
  key: "dbcs",
  label: "Designated Body",
  options: [
    { key: "1-AIIDR8", value: "Kent, Surrey and Sussex" },
    { key: "1-AIIDVS", value: "North Central and East London" },
    { key: "1-AIIDWA", value: "North West London" },
    { key: "1-AIIDWI", value: "South London" }
  ],
  order: 2,
  controlType: "selectionList",
  initialValue: []
};
