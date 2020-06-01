import { IRecordDataCell } from "./records.interfaces";

export const RECORDS_COLUMN_DATA: IRecordDataCell[] = [
  {
    label: "First name",
    name: "doctorFirstName",
    enableSort: true
  },
  {
    label: "Last name",
    name: "doctorLastName",
    enableSort: true
  },
  {
    label: "GMC No",
    name: "gmcReferenceNumber",
    enableSort: false
  }
];
