import { Component, OnInit } from "@angular/core";
import { environment } from "@environment";
import { AuthService } from "src/app/core/auth/auth.service";

@Component({
  selector: "app-status-bar",
  templateUrl: "./status-bar.component.html",
  styleUrls: ["./status-bar.component.scss"]
})
export class StatusBarComponent implements OnInit {
  serviceSeverity: Severity;
  helpLink: string = environment.supportLink;
  notificationsCount: number;
  username: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.setUsername();
    this.setServiceStatus();
    this.setNotifications();
  }

  setUsername(): void {
    this.username = this.authService.userName
      ? this.authService.userName
      : this.authService.fullName;
  }

  setServiceStatus(): void {
    // TO:DO get service statuses
    this.serviceSeverity = Severity.NONE;
  }

  setNotifications(): void {
    // TO:DO get notifications count
    this.notificationsCount = 3;
  }

  logOut(): void {
    this.authService.signOut();
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
