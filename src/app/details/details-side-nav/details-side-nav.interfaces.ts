import { INote } from "../notes-drawer/notes-drawer.interfaces";
export interface IDetailsSideNav {
  gmcNumber: number;
  forenames: string;
  surname: string;
  curriculumEndDate: string;
  programmeMembershipType: string;
  programmeName: string;
  currentGrade: string;
  tisPersonId: number;
  notes?: INote[];
}
