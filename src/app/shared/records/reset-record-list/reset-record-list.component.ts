import { Component } from "@angular/core";
import { Sort } from "@angular/material/sort";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { RecordsService } from "../services/records.service";

@Component({
  selector: "app-reset-record-list",
  templateUrl: "./reset-record-list.component.html"
})
export class ResetRecordListComponent {
  public sort$: Observable<Sort> = this.store.select(
    (state) => state[this.recordsService.stateName].sort
  );
  public pageIndex$: Observable<number> = this.store.select(
    (state) => state[this.recordsService.stateName].pageIndex
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
