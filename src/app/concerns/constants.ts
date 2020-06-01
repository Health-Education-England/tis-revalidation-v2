import { Sort } from "@angular/material/sort";
import { RECORDS_COLUMN_DATA } from "../shared/records/constants";
import { IRecordDataCell } from "../shared/records/records.interfaces";

export const DEFAULT_SORT: Sort = {
  active: "dateRaised",
  direction: "desc"
};

export const COLUMN_DATA: IRecordDataCell[] = [
  ...RECORDS_COLUMN_DATA,
  {
    label: "Programme",
    name: "programmeNumber",
    enableSort: false
  },
  {
    label: "Date raised",
    name: "dateRaised",
    enableSort: true
  },
  {
    label: "Type",
    name: "type",
    enableSort: false
  },
  {
    label: "Site",
    name: "site",
    enableSort: false
  },
  {
    label: "Source",
    name: "source",
    enableSort: false
  },
  {
    label: "Status",
    name: "status",
    enableSort: false
  },
  {
    label: "Admin",
    name: "admin",
    enableSort: false
  },
  {
    label: "Follow-up date",
    name: "followUpDate",
    enableSort: false
  },
  {
    label: "Closed date",
    name: "closedDate",
    enableSort: false
  }
];
