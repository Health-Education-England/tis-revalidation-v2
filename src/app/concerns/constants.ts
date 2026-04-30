import { IRecordDataCell } from "../records/records.interfaces";

export const COLUMN_DATA: IRecordDataCell[] = [
  { label: "Programme", name: "programme", enableSort: false },
  {
    label: "Date raised",
    name: "dateRaised",
    enableSort: false,
    displayType: "date"
  },
  { label: "Type", name: "type", enableSort: false },
  { label: "Site", name: "site", enableSort: false },
  { label: "Source", name: "source", enableSort: false },
  { label: "Status", name: "status", enableSort: false },
  { label: "Admin", name: "admin", enableSort: false },
  {
    label: "Follow-up date",
    name: "followUpDate",
    enableSort: false,
    displayType: "date"
  },
  {
    label: "Closed date",
    name: "closedDate",
    enableSort: false,
    displayType: "date"
  }
];
