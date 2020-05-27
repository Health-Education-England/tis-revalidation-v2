import { Sort } from "@angular/material/sort";
import { IRecordDataCell } from "../shared/records/records.interfaces";

export const DEFAULT_SORT: Sort = {
  active: "dateRaised",
  direction: "desc"
};

export const COLUMN_DATA: IRecordDataCell[] = [
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
    label: "Gmc no",
    name: "gmcReferenceNumber",
    enableSort: false
  },
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
