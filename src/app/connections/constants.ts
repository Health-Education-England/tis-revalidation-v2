import {
  AutocompleteControl,
  FormControlBase,
  FormControlType
} from "../shared/form-controls/form-contol-base.model";
import { ConnectionsFilterType } from "./connections.interfaces";
export const COLUMN_DATA: [string, string, boolean, string?][] = [
  ["Current programme name", "programmeName", false],
  ["GMC Submission date", "submissionDate", true],
  ["GMC Designated body", "designatedBody", true],
  ["Programme owner", "tcsDesignatedBody", true],
  ["Programme membership", "programmeMembershipType", true, "membershipType"]
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
    order: 3,
    controlType: FormControlType.AUTOCOMPLETE,
    placeholder: "Start typing..."
  },

  {
    key: "tisDesignatedBodies",
    label: "Ready for connection",
    valueProperty: "userDesignatedBodies",
    order: 1,
    controlType: FormControlType.CHECKBOX,
    filterType: ConnectionsFilterType.DISCREPANCIES
  },
  {
    key: "dbcs",
    label: "Ready for disconnection",
    valueProperty: "userDesignatedBodies",
    order: 2,
    controlType: FormControlType.CHECKBOX,
    filterType: ConnectionsFilterType.DISCREPANCIES
  }
];
