import { Component, Input } from "@angular/core";
import { IConnectionHistory } from "../connection.interfaces";
import { environment } from "@environment";
@Component({
    selector: "app-connection-history",
    templateUrl: "./connection-history.component.html",
    standalone: false
})
export class ConnectionHistoryComponent {
  @Input() connectionHistory: IConnectionHistory[];
  @Input() connectionsColumnsToDisplay: string[];
  dateFormat = environment.dateFormat;
}
