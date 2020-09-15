export interface IGetRecordsResponse {
  totalResults: number;
  totalPages: number;
}

export interface IRecordDataCell {
  isCheckbox?: boolean;
  label?: string;
  name: string;
  enableSort?: boolean;
  enableFilter?: boolean;
}

export interface ITotalCounts {
  [key: string]: number;
}

export interface IFilter {
  label: string;
  name: string;
}
