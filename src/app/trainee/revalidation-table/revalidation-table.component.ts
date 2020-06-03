import { Component, OnInit, Input } from "@angular/core";
import {
  IRevalidation,
  RevalidationGmcOutcome,
  RecommendationType,
  RevalidationStatus
} from "../revalidation-history.interface";
import { environment } from "@environment";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";

@Component({
  selector: "app-revalidation-table",
  templateUrl: "./revalidation-table.component.html",
  styleUrls: ["./revalidation-table.component.scss"],
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
export class RevalidationTableComponent implements OnInit {
  columnsToDisplay = [
    "recommendationType",
    "gmcOutcome",
    "gmcSubmissionDate",
    "actualSubmissionDate",
    "admin"
  ];
  expandedElement: IRevalidation | null;
  dateFormat = environment.dateFormat;
  @Input() revalidationHistory: IRevalidation[];
  revalidationGmcOutcome = RevalidationGmcOutcome;
  recommendationType = RecommendationType;
  revalidationStatus = RevalidationStatus;

  constructor() {}

  currentExpanded(element: any) {
    this.expandedElement = this.expandedElement === element ? null : element;
  }

  ngOnInit(): void {}
}
