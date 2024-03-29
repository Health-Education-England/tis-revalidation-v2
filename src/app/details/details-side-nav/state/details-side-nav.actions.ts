import { INote } from "../../notes-drawer/notes-drawer.interfaces";

export class Get {
  static readonly type = "[detailssidenav] Get";
  constructor(public gmcNumber: number) {}
}

export class AddNote {
  static readonly type = "[detailssidenav] AddNote";
  constructor(public payload: INote) {}
}

export class EditNote {
  static readonly type = "[detailssidenav] EditNote";
  constructor(public payload: INote) {}
}
