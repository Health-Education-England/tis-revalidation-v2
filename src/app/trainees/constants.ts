import { Sort } from "@angular/material/sort";
import { IRecordDataCell } from "../shared/records/records.interfaces";

export const DEFAULT_SORT: Sort = {
  active: "submissionDate",
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
