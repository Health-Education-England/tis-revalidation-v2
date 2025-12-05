export interface IGetRecordsResponse {
  totalResults: number;
  totalPages: number;
}

export interface IRecordDataCell {
  isCheckbox?: boolean;
  label?: string;
  name: string;
  enableSort?: boolean;
  sortBy?: string;
  class?: string;
  columnGroup?: string;
}

export interface IColumnGroups {
  name: string;
  count: number;
  matColumnDef: string;
  class: string;
}

export interface ITotalCounts {
  [key: string]: number;
}

export interface IFilter {
  label: string;
  name: string;
}

export interface ITableFilters {
  [key: string]: string | string[];
}

export enum stateName {
  RECOMMENDATIONS = "recommendations",
  CONNECTIONS = "connections"
}
