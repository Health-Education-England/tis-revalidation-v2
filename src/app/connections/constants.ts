import { Sort } from "@angular/material/sort";
import { RECORDS_COLUMN_DATA } from "../shared/records/constants";
import { IRecordDataCell } from "../shared/records/records.interfaces";

export const DEFAULT_SORT: Sort = {
  active: "gmcSubmissionDate",
  direction: "desc"
};

export const COLUMN_DATA: IRecordDataCell[] = [
  ...RECORDS_COLUMN_DATA,
  {
    label: "Programme name",
    name: "programmeName",
    enableSort: false
  },
  {
    label: "GMC Submission date",
    name: "gmcSubmissionDate",
    enableSort: false
  },
  {
    label: "Designated body",
    name: "designatedBody",
    enableSort: false
  },
  {
    label: "Programme owner",
    name: "programmeOwner",
    enableSort: false
  },
  {
    label: "Programme membership",
    name: "programmeMembership",
    enableSort: false
  },
  {
    label: "Current connection",
    name: "currentConnection",
    enableSort: false
  },
  {
    label: "Start date",
    name: "startDate",
    enableSort: false
  },
  {
    label: "End date",
    name: "endDate",
    enableSort: false
  }
];
