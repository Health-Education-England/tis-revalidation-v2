import { Component } from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";
import { IConcernSummary, ConcernStatus } from "./concern-history.interface";
import { environment } from "@environment";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";

@Component({
  selector: "app-concern",
  templateUrl: "./concern.component.html",
  styleUrls: [
    "./concern.component.scss",
    "../../app/shared/details/details.table.scss"
  ],
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
export class ConcernComponent {
  columnsToDisplay = [
    "concernId",
    "dateOfIncident",
    "concernType",
    "source",
    "dateReported",
    "employer",
    "site",
    "grade",
    "status",
    "admin",
    "followUpDate",
    "lastUpdatedDate"
  ];
  expandedElement: IConcernSummary | null;
  dateFormat = environment.dateFormat;
  concernStatus = ConcernStatus;
  public concernHistory$: Observable<boolean> = this.store.select(
    (concernState) => concernState.concern.item.concerns
  );

  constructor(private store: Store) {}

  currentExpanded(element: any, event: Event) {
    event.stopPropagation();
    this.expandedElement = this.expandedElement === element ? null : element;
  }
}
