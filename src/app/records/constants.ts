import { Sort } from "@angular/material/sort";
import { IRecordDataCell } from "./records.interfaces";

export const DEFAULT_SORT: Sort = {
  active: "gmcReferenceNumber",
  direction: "asc"
};

export const RECORDS_COLUMN_DATA: IRecordDataCell[] = [
  {
    label: "First name",
    name: "doctorFirstName",
    enableSort: true,
    class: "fixed"
  },
  {
    label: "Last name",
    name: "doctorLastName",
    enableSort: true
  },
  {
    label: "GMC No",
    name: "gmcReferenceNumber",
    enableSort: true
  }
];
