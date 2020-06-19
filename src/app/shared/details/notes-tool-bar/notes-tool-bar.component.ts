import { Component, OnInit } from "@angular/core";
import { Select } from "@ngxs/store";
import { RecommendationNotesState } from "src/app/recommendation/state/recommendation-notes.state";
import { Observable } from "rxjs";
import { INote } from "src/app/recommendation/recommendation-history.interface";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { RecommendationNotesComponent } from "src/app/recommendation/recommendation-notes/recommendation-notes.component";

@Component({
  selector: "app-notes-tool-bar",
  templateUrl: "./notes-tool-bar.component.html",
  styleUrls: ["./notes-tool-bar.component.scss"]
})
export class NotesToolBarComponent implements OnInit {
  @Select(RecommendationNotesState.recommendationNotes)
  recommendationNotes$: Observable<INote[]>;

  constructor(private bottomSheet: MatBottomSheet) {}

  ngOnInit(): void {}

  openNotes(): void {
    this.bottomSheet.open(RecommendationNotesComponent);
  }
}
