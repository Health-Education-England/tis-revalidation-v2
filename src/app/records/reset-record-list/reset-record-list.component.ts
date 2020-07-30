import { Component } from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { RecordsService } from "../services/records.service";

@Component({
  selector: "app-reset-record-list",
  templateUrl: "./reset-record-list.component.html"
})
export class ResetRecordListComponent {
  public enableAllocateAdmin$: Observable<boolean> = this.store.select(
    (state) => state[this.recordsService.stateName].enableAllocateAdmin
  );

  constructor(private store: Store, private recordsService: RecordsService) {}

  public resetRecordList(): void {
    this.recordsService.resetSearchForm$.next(true);
    this.recordsService
      .resetRecordsState()
      .pipe(take(1))
      .subscribe(() => this.recordsService.updateRoute());
  }
}
