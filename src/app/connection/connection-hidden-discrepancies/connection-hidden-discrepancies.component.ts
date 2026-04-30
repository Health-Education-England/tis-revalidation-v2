import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IHiddenDiscrepancy } from "../connection.interfaces";
import { environment } from "@environment";

@Component({
  selector: "app-connection-hidden-discrepancies",
  templateUrl: "./connection-hidden-discrepancies.component.html"
})
export class ConnectionHiddenDiscrepanciesComponent {
  @Input() hiddenDiscrepancies: IHiddenDiscrepancy[];
  @Input() hiddenDiscrepanciesColumnsToDisplay: string[];
  @Output() showDiscrepancy = new EventEmitter<string>();
  dateFormat = environment.dateFormat;
  onShowDiscrepancy(discrepancyId: string) {
    this.showDiscrepancy.emit(discrepancyId);
  }
}
