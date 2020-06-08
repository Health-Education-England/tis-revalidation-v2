import { Sort } from "@angular/material/sort";

export const DEFAULT_SORT: Sort = {
  active: "dateRaised",
  direction: "desc"
};

export const COLUMN_DATA: any[][] = [
  ["Programme", "programme", false],
  ["Date raised", "dateRaised", true],
  ["Type", "type", false],
  ["Site", "site", false],
  ["Source", "source", false],
  ["Status", "status", false],
  ["Admin", "admin", false],
  ["Follow-up date", "followUpDate", false],
  ["Closed date", "closedDate", false]
];
