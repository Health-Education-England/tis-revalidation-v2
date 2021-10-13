import { INote } from "../details.interfaces";
export interface IDetailsSideNav {
  gmcNumber: number;
  forenames: string;
  surname: string;
  cctDate: string;
  programmeMembershipType: string;
  programmeName: string;
  currentGrade: string;
  tisPersonId: number;
  notes?: INote[];
}
