import { environment } from "@environment";
import {
  AutocompleteControl,
  FormControlBase,
  FormControlType
} from "../shared/form-controls/form-contol-base.model";
import { ConnectionsFilterType } from "./connections.interfaces";
import { IRecordDataCell } from "../records/records.interfaces";

export const COLUMN_DATA: IRecordDataCell[] = [
  {
    label: "Submission date",
    name: "submissionDate",
    enableSort: true,
    columnGroup: "GMC",
    class: "cell-highlight start"
  },
  {
    label: "Designated body",
    name: "designatedBody",
    enableSort: true,
    columnGroup: "GMC",
    class: "cell-highlight end"
  },
  {
    label: "Owner",
    name: "tcsDesignatedBody",
    enableSort: true,
    columnGroup: "Current programme"
  },
  {
    label: "Name",
    name: "programmeName",
    enableSort: false,
    columnGroup: "Current programme"
  },

  {
    label: "Membership type",
    name: "programmeMembershipType",
    enableSort: true,
    sortBy: "membershipType",
    columnGroup: "Current programme"
  },
  {
    label: "Membership start date",
    name: "programmeMembershipStartDate",
    enableSort: true,
    sortBy: "membershipStartDate",
    columnGroup: "Current programme"
  },
  {
    label: "Membership end date",
    name: "programmeMembershipEndDate",
    enableSort: true,
    sortBy: "membershipEndDate",
    columnGroup: "Current programme"
  },

  {
    label: "Last updated",
    name: "lastConnectionDateTime",
    enableSort: true,
    columnGroup: "Updated",
    class: "cell-highlight start"
  },
  {
    label: "Updated",
    name: "updatedBy",
    enableSort: true,
    columnGroup: "Updated",
    class: "cell-highlight end"
  }
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
