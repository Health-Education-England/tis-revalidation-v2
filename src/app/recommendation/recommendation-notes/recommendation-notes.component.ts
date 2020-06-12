import { Component, OnInit } from "@angular/core";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { INote } from "../recommendation-history.interface";
import { Select } from "@ngxs/store";
import { RecommendationNotesState } from "../state/recommendation-notes.state";
import { Observable } from "rxjs";

@Component({
  selector: "app-recommendation-notes",
  templateUrl: "./recommendation-notes.component.html",
  styleUrls: ["./recommendation-notes.component.scss"]
})
export class RecommendationNotesComponent implements OnInit {
  @Select(RecommendationNotesState.recommendationNotes)
  recommendationNotes$: Observable<INote[]>;
  addEditNote: boolean;
  constructor(
    private bottomSheetRef: MatBottomSheetRef<RecommendationNotesComponent>
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
