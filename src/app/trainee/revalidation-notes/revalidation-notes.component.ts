import { Component, OnInit } from "@angular/core";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { INote } from "../revalidation-history.interface";
import { Select } from "@ngxs/store";
import { RevalidationNotesState } from "../state/revalidation-notes.state";
import { Observable } from "rxjs";

@Component({
  selector: "app-revalidation-notes",
  templateUrl: "./revalidation-notes.component.html",
  styleUrls: ["./revalidation-notes.component.scss"]
})
export class RevalidationNotesComponent implements OnInit {
  @Select(RevalidationNotesState.revalidationNotes)
  revalidationNotes$: Observable<INote[]>;
  addEditNote: boolean;
  constructor(
    private bottomSheetRef: MatBottomSheetRef<RevalidationNotesComponent>
  ) {}

  ngOnInit(): void {
    this.addEditNote = false;
  }

  addNote(): void {
    this.addEditNote = true;
  }

  cancelNote(): void {
    this.addEditNote = false;
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
