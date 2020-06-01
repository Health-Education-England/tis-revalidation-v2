import { Sort } from "@angular/material/sort";
import { RECORDS_COLUMN_DATA } from "../shared/records/constants";
import { IRecordDataCell } from "../shared/records/records.interfaces";

export const DEFAULT_SORT: Sort = {
  active: "submissionDate",
  direction: "desc"
};

export const COLUMN_DATA: IRecordDataCell[] = [
  ...RECORDS_COLUMN_DATA,
  {
    label: "GMC Submission due date",
    name: "submissionDate",
    enableSort: true
  },
  {
    label: "Status",
    name: "doctorStatus",
    enableSort: false
  },
  {
    label: "Programme name",
    name: "programmeName",
    enableSort: false
  },
  {
    label: "Programme membership type",
    name: "programmeMembershipType",
    enableSort: false
  },
  {
    label: "CCT date",
    name: "cctDate",
    enableSort: true
  },
  {
    label: "Admin",
    name: "admin",
    enableSort: false
  },
  {
    label: "Last updated",
    name: "lastUpdatedDate",
    enableSort: true
  }
];
