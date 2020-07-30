import { Component } from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { RecordsService } from "../services/records.service";

@Component({
  selector: "app-refresh-data-btn",
  templateUrl: "./refresh-data-btn.component.html"
})
export class RefreshDataBtnComponent {
  public enableAllocateAdmin$: Observable<boolean> = this.store.select(
    (state) => state[this.recordsService.stateName].enableAllocateAdmin
  );

  constructor(private store: Store, private recordsService: RecordsService) {}

  public refreshData(): Observable<any> {
    return this.recordsService.get();
  }
}
