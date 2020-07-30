import { Component } from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { RecordsService } from "../../../records/services/records.service";

@Component({
  selector: "app-allocate-admin-btn",
  templateUrl: "./allocate-admin-btn.component.html"
})
export class AllocateAdminBtnComponent {
  public enableAllocateAdmin$: Observable<boolean> = this.store.select(
    (state) => state[this.recordsService.stateName].enableAllocateAdmin
  );

  constructor(private store: Store, private recordsService: RecordsService) {}

  public enableAllocateAdmin(): void {
    this.recordsService.enableAllocateAdmin(true);
  }

  public disableAllocateAdmin(): void {
    this.recordsService.enableAllocateAdmin(false);
  }
}
