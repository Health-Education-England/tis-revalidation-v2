import { IRecordDataCell } from "../records/records.interfaces";
import {
  AutocompleteControl,
  FormControlBase,
  FormControlType
} from "../shared/form-controls/form-contol-base.model";
// export const COLUMN_DATA: [string, string, boolean][] = [
//   ["Current programme name", "programmeName", false],
//   ["Programme start", "programmeMembershipStartDate", true],
//   ["Programme end", "programmeMembershipEndDate", columnDatatrue],
//   ["GMC Submission date", "submissionDate", false],
//   ["GMC Designated body", "designatedBody", true],
//   ["Programme owner", "tcsDesignatedBody", true],
//   ["Programme membership", "programmeMembershipType", false]
// ];

export const COLUMN_DATA: IRecordDataCell[] = [
  {
    label: "Current programme name",
    name: "programmeName",
    enableSort: true
  },
  {
    label: "Programme start",
    name: "programmeMembershipStartDate",
    enableSort: true,
    hidden: true
  },
  {
    label: "Programme end",
    name: "programmeMembershipEndDate",
    enableSort: true,
    hidden: true
  },
  {
    label: "GMC Submission date",
    name: "submissionDate",
    enableSort: false
  },
  {
    label: "GMC Designated body",
    name: "designatedBody",
    enableSort: true
  },
  {
    label: "Programme owner",
    name: "tcsDesignatedBody",
    enableSort: true
  },
  {
    label: "Programme membership",
    name: "programmeMembershipType",
    enableSort: false
  }
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
