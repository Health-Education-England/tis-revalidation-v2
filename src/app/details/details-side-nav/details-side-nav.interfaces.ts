import { IProgramme } from "src/app/connection/connection.interfaces";
import { INote } from "../notes-drawer/notes-drawer.interfaces";
import { IConnection } from "src/app/connections/connections.interfaces";
export interface IDetailsSideNav {
  programme: IProgramme,
  notes: INote[],
  doctor: IConnection
}
