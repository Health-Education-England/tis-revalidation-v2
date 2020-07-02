import { Component } from "@angular/core";
import { RecordsService } from "../services/records.service";

@Component({
  selector: "app-allocate-admin-btn",
  templateUrl: "./allocate-admin-btn.component.html"
})
export class AllocateAdminBtnComponent {
  constructor(private recordsService: RecordsService) {}

  public enableAllocateAdmin(): void {
    this.recordsService.enableAllocateAdmin(true);
  }
}
