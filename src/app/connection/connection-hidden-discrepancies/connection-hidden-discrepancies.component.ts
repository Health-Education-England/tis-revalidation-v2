import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  IHiddenDiscrepancy,
  IShowDiscrepancyParameters
} from "../connection.interfaces";
import { environment } from "@environment";

@Component({
  selector: "app-connection-hidden-discrepancies",
  templateUrl: "./connection-hidden-discrepancies.component.html"
})
export class ConnectionHiddenDiscrepanciesComponent {
  @Input() hiddenDiscrepancies: IHiddenDiscrepancy[];
  @Input() hiddenDiscrepanciesColumnsToDisplay: string[];
  @Input() updatingDiscrepancyIds: string[] = [];

  @Output() showDiscrepancy = new EventEmitter<IShowDiscrepancyParameters>();
  dateFormat = environment.dateFormat;
  onShowDiscrepancy(
    discrepancyId: string,
    hiddenForDesignatedBodyCode: string
  ) {
    let showDiscrepancyParameters: IShowDiscrepancyParameters = {
      discrepancyId: discrepancyId,
      hiddenForDesignatedBodyCode: hiddenForDesignatedBodyCode
    };

    this.showDiscrepancy.emit(showDiscrepancyParameters);
  }
}
