import { Component } from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { ClearAllocateList, SubmitAllocateList } from "../state/admins.actions";
import { RecordsService } from "../../../records/services/records.service";

@Component({
  selector: "app-allocate-admin-actions",
  templateUrl: "./allocate-admin-actions.component.html"
})
export class AllocateAdminActionsComponent {
  public enableAllocateAdmin$: Observable<boolean> = this.store.select(
    (state) => state[this.recordsService.stateName].enableAllocateAdmin
  );

  constructor(private store: Store, private recordsService: RecordsService) {}

  public cancel(): void {
    this.recordsService.enableAllocateAdmin(false);
    this.store.dispatch(new ClearAllocateList());
  }

  public save(): void {
    this.recordsService.enableAllocateAdmin(false);
    this.store
      .dispatch(new SubmitAllocateList())
      .pipe(take(1))
      .subscribe(() => this.recordsService.get());
  }
}
