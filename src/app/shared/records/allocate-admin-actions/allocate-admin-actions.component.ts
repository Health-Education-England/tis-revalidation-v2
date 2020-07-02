import { Component } from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { RecordsService } from "../services/records.service";

@Component({
  selector: "app-allocate-admin-actions",
  templateUrl: "./allocate-admin-actions.component.html"
})
export class AllocateAdminActionsComponent {
  public enableAllocateAdmin$: Observable<boolean> = this.store.select(
    (state) => state[this.recordsService.stateName].enableAllocateAdmin
  );

  constructor(private store: Store, private recordsService: RecordsService) {}

  // TODO add logic
  public cancel(): void {
    this.recordsService.enableAllocateAdmin(false);
  }

  // TODO add logic
  public save(): void {
    this.recordsService.enableAllocateAdmin(false);
  }
}
