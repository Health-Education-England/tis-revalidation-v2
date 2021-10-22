export interface INote {
  gmcId: number;
  text: string;
  id?: number;
  edit?: boolean;
  createdDate?: Date;
  updatedDate?: Date;
}
