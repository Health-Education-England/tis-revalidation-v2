export interface ITrainee {
  dateAdded: string;
  doctorFirstName: string;
  doctorLastName: string;
  gmcReferenceNumber: string;
  sanction: string;
  submissionDate: string;
  underNotice: string;
}

export interface IGetTraineesResponse {
  doctorsForDB: ITrainee[];
  count: number;
}

export interface ITraineeDataCell {
  label: string;
  name: string;
}
