import { Component, OnInit } from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { EnableUpdateConnections } from "src/app/connections/state/connections.actions";
import { RecordsService } from "src/app/records/services/records.service";

@Component({
  selector: "app-update-connetions-btn",
  templateUrl: "./update-connetions-btn.component.html"
})
export class UpdateConnetionsBtnComponent {
  public enableUpdateConnection$: Observable<boolean> = this.store.select(
    (state) => state[this.recordsService.stateName].enableUpdateConnections
  );

  constructor(private store: Store, private recordsService: RecordsService) {}

  public enableUpdateConnection(): void {
    this.store.dispatch(new EnableUpdateConnections(true));

    this.recordsService.enableAllocateAdmin(true);
  }

  public disableUpdateConnection(): void {
    this.store.dispatch(new EnableUpdateConnections(false));

    this.recordsService.enableAllocateAdmin(false);
  }
}
