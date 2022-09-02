import { Sort } from "@angular/material/sort";
import {
  ControlBase,
  MaterialAutocompleteControl
} from "../shared/form-controls/contol-base.model";

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
  ControlBase | MaterialAutocompleteControl
> = [
  {
    key: "gmcStatus",
    label: "GMC Status",
    options: [
      { key: "Approved", value: "Approved" },
      { key: "Rejected", value: "Rejected" },
      { key: "Under Review", value: "Under Review" }
    ],
    order: 1,
    controlType: "selectionList",
    initialValue: []
  },
  {
    key: "tisStatus",
    label: "TIS Status",
    options: [
      { key: "Not started", value: "Not started" },
      { key: "Submitted to GMC", value: "Submitted to GMC" },
      { key: "Draft", value: "Draft" },
      { key: "Complete", value: "Complete" }
    ],
    order: 2,
    controlType: "selectionList",
    initialValue: []
  },
  {
    key: "programmeName",
    label: "Programme name",
    order: 4,
    initialValue: [],
    controlType: "autocomplete",
    allowMultipleSelections: false,
    serviceMethod: "loadMovies",
    placeholder: "Start typing..."
  }
];

export const TABLE_FILTERS_FORM_DBC: ControlBase = {
  key: "dbc",
  label: "Designated Body",
  options: [
    { key: "KSS", value: "Kent, Surrey and Sussex" },
    { key: "NCEL", value: "North Central and East London" },
    { key: "NWL", value: "North West London" },
    { key: "SL", value: "South London" }
  ],
  order: 3,
  controlType: "selectionList",
  initialValue: []
};
