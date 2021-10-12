import { Component, OnInit } from "@angular/core";
import { INote } from "../details.interfaces";
import { notes } from "./mock-data/notes-spec-data";
import { Select } from "@ngxs/store";
import { NotesDrawerState } from "../notes-drawer/state/notes-drawer.state";
import { Observable } from "rxjs";

@Component({
  selector: "app-notes-drawer",
  templateUrl: "./notes-drawer.component.html",
  styleUrls: ["./notes-drawer.component.scss"]
})
export class NotesDrawerComponent implements OnInit {
  notes: INote[];
  note: INote;
  showAddNote: boolean;
  noteText: string;

  @Select(NotesDrawerState.drawerStatus) isOpen$: Observable<boolean>;

  @Select(NotesDrawerState.getNotes) notes$: Observable<INote[]>;

  constructor() {}

  ngOnInit(): void {
    this.showAddNote = false;
  }
}
