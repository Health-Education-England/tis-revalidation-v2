export interface IGetRecordsResponse {
  totalResults: number;
  totalPages: number;
}

export interface IRecordDataCell {
  label: string;
  name: string;
  enableSort: boolean;
}
