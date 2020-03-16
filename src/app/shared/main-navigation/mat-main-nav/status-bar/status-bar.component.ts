import { Component, OnInit } from "@angular/core";
import { environment } from "@environment";

@Component({
  selector: "app-status-bar",
  templateUrl: "./status-bar.component.html",
  styleUrls: ["./status-bar.component.scss"]
})
export class StatusBarComponent implements OnInit {
  serviceSeverity: Severity;
  helpLink: string = environment.supportLink;
  notificationsCount: number;

  constructor() {}

  ngOnInit(): void {
    // TO:DO get service statuses
    this.serviceSeverity = Severity.NONE;
    // TO:DO get notifications count
    this.notificationsCount = 3;
  }
}

/**
 * service status severity
 */
export enum Severity {
  HIGH,
  MEDIUM,
  LOW,
  NONE
}
