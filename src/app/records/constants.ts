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
    enableFilter: false
  },
  {
    label: "Last name",
    name: "doctorLastName",
    enableSort: true,
    enableFilter: false
  },
  {
    label: "GMC No",
    name: "gmcReferenceNumber",
    enableSort: false,
    enableFilter: false
  }
];

export const generateColumnData = (data: any[][]): IRecordDataCell[] => {
  const generatedData: IRecordDataCell[] = [...RECORDS_COLUMN_DATA];

  data.forEach((item: any[]) => {
    generatedData.push({
      label: item[0],
      name: item[1],
      enableSort: item[2],
      enableFilter: item[3]
    });
  });

  return generatedData;
};
