export interface IGetRecordsResponse {
  totalResults: number;
  totalPages: number;
}

export interface IRecordDataCell {
  isCheckbox?: boolean;
  label?: string;
  name: string;
  enableSort?: boolean;
}
