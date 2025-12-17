import { environment } from "@environment";
import {
  AutocompleteControl,
  DateRangeControl,
  FormControlBase,
  FormControlType
} from "../shared/form-controls/form-contol-base.model";
import { ConnectionsFilterType } from "./connections.interfaces";
import { IRecordDataCell } from "../records/records.interfaces";

export const COLUMN_DATA: IRecordDataCell[] = [
  {
    label: "GMC Submission date",
    name: "submissionDate",
    enableSort: true,
    displayType: "date"
  },
  {
    label: "GMC Designated body",
    name: "designatedBody",
    enableSort: true,
    displayType: "dbc"
  },
  {
    label: "Programme owner",
    name: "tcsDesignatedBody",
    enableSort: true,
    displayType: "dbc"
  },
  {
    label: "Programme name",
    name: "programmeName",
    enableSort: false
  },

  {
    label: "Programme membership",
    name: "programmeMembershipType",
    enableSort: true,
    sortBy: "membershipType"
  },
  {
    label: "Programme membership start date",
    name: "programmeMembershipStartDate",
    enableSort: true,
    sortBy: "membershipStartDate",
    displayType: "date"
  },
  {
    label: "Programme membership end date",
    name: "programmeMembershipEndDate",
    enableSort: true,
    sortBy: "membershipEndDate",
    displayType: "date"
  },
  {
    label: "Last updated",
    name: "lastConnectionDateTime",
    enableSort: true,
    displayType: "datetime"
  },
  {
    label: "Last updated by",
    name: "updatedBy",
    enableSort: true,
    displayType: "admin"
  }
];

export const EXCEPTIONSLOG_COLUMN_DATA: { name: string; label: string }[] = [
  { name: "timestamp", label: "Date/time" },
  { name: "gmcId", label: "GMC Number" },
  { name: "errorMessage", label: "Error message" }
];

export const TABLE_FILTERS_FORM_BASE: Array<
  FormControlBase | DateRangeControl | AutocompleteControl
> = [
  {
    key: "programmeName",
    label: "Programme name",
    order: 3,
    controlType: FormControlType.AUTOCOMPLETE,
    placeholder: "Start typing..."
  },
  {
    key: "membershipEndDate",
    label: "Membership end date",
    order: 4,
    controlType: FormControlType.DATERANGE,
    startRangeControl: "From",
    endRangeControl: "To"
  }
];

export const TABLE_FILTERS_FORM_DBC: FormControlBase[] = [
  {
    key: "tisDesignatedBodies",
    label: "Ready for connection",
    order: 1,
    valueProperty: "userDesignatedBodies",
    controlType: FormControlType.CHECKBOX,
    filterType: ConnectionsFilterType.DISCREPANCIES
  },
  {
    key: "dbcs",
    label: "Ready for disconnection",
    order: 2,
    valueProperty: "userDesignatedBodies",
    controlType: FormControlType.CHECKBOX,
    filterType: ConnectionsFilterType.DISCREPANCIES
  }
];

export const TABLE_FILTERS_FORM_DBC_LONDON: FormControlBase[] = [
  {
    key: "dbcs",
    label: "Ready for disconnection from",
    options: environment.londonDBCs,
    order: 1,
    controlType: FormControlType.SELECTION_LIST,
    initialValue: [],
    filterType: ConnectionsFilterType.DISCREPANCIES
  },
  {
    key: "tisDesignatedBodies",
    label: "Ready for connection to",
    options: environment.londonDBCs,
    order: 2,
    controlType: FormControlType.SELECTION_LIST,
    initialValue: [],
    filterType: ConnectionsFilterType.DISCREPANCIES
  }
];
