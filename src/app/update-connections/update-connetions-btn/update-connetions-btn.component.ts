import { Component, OnInit } from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { UpdateConnectionsService } from "../services/update-connections.service";

@Component({
  selector: "app-update-connetions-btn",
  templateUrl: "./update-connetions-btn.component.html"
})
export class UpdateConnetionsBtnComponent {
  public enableUpdateConnections$: Observable<boolean> = this.store.select(
    (state) =>
      state[this.updateConnectionsService.stateName].enableUpdateConnections
  );

  constructor(
    private store: Store,
    private updateConnectionsService: UpdateConnectionsService
  ) {}

  public enableUpdateConnection(): void {
    this.updateConnectionsService.enableUpdateConnections(true);
  }

  public disableUpdateConnection(): void {
    this.updateConnectionsService.enableUpdateConnections(false);
  }
}
