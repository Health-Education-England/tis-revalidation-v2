import { Component, OnInit } from "@angular/core";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { RevalidationNotesComponent } from "../revalidation-notes/revalidation-notes.component";
import { MatDialog } from "@angular/material/dialog";
import { RevalidationFormComponent } from "../revalidation-form/revalidation-form.component";
import {
  IRecommendation,
  IRevalidationHistory
} from "../revalidation-history.interface";
import { RevalidationHistoryState } from "../state/revalidation-history.state";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map, shareReplay } from "rxjs/operators";
import { environment } from "@environment";

@Component({
  selector: "app-revalidation-history",
  templateUrl: "./revalidation-history.component.html",
  styleUrls: ["./revalidation-history.component.scss"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ])
  ]
})
export class RevalidationHistoryComponent implements OnInit {
  columnsToDisplay = [
    "recommendation",
    "outcome",
    "gmcSubDueDate",
    "actSubDate",
    "submittedBy"
  ];
  expandedElement: IRecommendation | null;

  @Select(RevalidationHistoryState.revalidationHistory)
  revalidationHistory$: Observable<IRevalidationHistory>;

  dateFormat = environment.dateFormat;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private bottomSheet: MatBottomSheet,
    public dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {}

  openNotes(): void {
    this.bottomSheet.open(RevalidationNotesComponent);
  }

  openDialog() {
    const dialogRef = this.dialog.open(RevalidationFormComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
