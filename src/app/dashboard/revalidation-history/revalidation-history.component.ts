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
  dataSource: PeriodicElement[];
  watchTrainee: boolean;
  columnsToDisplay = [
    "episodeId",
    "recommendation",
    "outcome",
    "gmcSubDueDate",
    "ActSubDate",
    "submittedBy"
  ];
  expandedElement: PeriodicElement | null;
  constructor(private bottomSheet: MatBottomSheet, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource = [
      {
        episodeId: 124735,
        recommendation: "Revalidate",
        outcome: "Approved",
        gmcSubDueDate: "17-Jun-2020",
        ActSubDate: "16-Jun-2019",
        submittedBy: "A Pringle",
        submissionStatus: `Revalidated`,
        comments: [`Form R received - no concerns`, `More comments added`]
      },
      {
        episodeId: 228741,
        recommendation: "Revalidate",
        outcome: "Rejected",
        gmcSubDueDate: "18-Jun-2020",
        ActSubDate: "16-Jun-2019",
        submittedBy: "A Pringle",
        submissionStatus: `Non Engagement on the 16-Jun-2019`,
        comments: [
          `Form R received - no concerns`,
          `Started GP training on 01/02/2019. No ARCP as yet.`
        ]
      },
      {
        episodeId: 109876,
        recommendation: "Revalidate",
        outcome: "Under review",
        gmcSubDueDate: "19-Jun-2020",
        ActSubDate: "16-Jun-2019",
        submittedBy: "A Pringle",
        submissionStatus: `Deferred on the 19-Jun-2020`,
        comments: [
          `Form R submitted to new system. No concerns.`,
          `Started GP training. No ARCP as yet.`
        ]
      }
    ];

    this.watchTrainee = false;
  }

  openNotes(): void {
    this.bottomSheet.open(RevalidationNotesComponent);
  }

  openDialog() {
    const dialogRef = this.dialog.open(RevalidationFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  toggleWatchTrainee(): void {
    this.watchTrainee = !this.watchTrainee;
  }
}

export interface PeriodicElement {
  recommendation: string;
  episodeId: number;
  outcome: string; // enum from GMC table
  gmcSubDueDate: string;
  ActSubDate: string;
  submittedBy: string;
  submissionStatus: string;
  comments: string[];
}
