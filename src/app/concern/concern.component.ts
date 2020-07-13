import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { Component } from "@angular/core";

import { environment } from "@environment";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { ConcernStatus, IConcernSummary } from "./concern.interfaces";
import { ConcernState } from "./state/concern.state";

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
  @Select(ConcernState.history) public history$: Observable<IConcernSummary[]>;

  currentExpanded(element: any, event: Event) {
    event.stopPropagation();
    this.expandedElement = this.expandedElement === element ? null : element;
  }
}
