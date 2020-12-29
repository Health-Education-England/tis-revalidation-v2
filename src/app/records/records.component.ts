import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { UpdateConnectionsService } from "../update-connections/services/update-connections.service";
import { RecordsService } from "./services/records.service";

@Component({
  selector: "app-records",
  templateUrl: "./records.component.html",
  styleUrls: ["./records.component.scss"]
})
export class RecordsComponent {
  @Output() updateConnections = new EventEmitter<any>();
  @Input() public loading: boolean;

  public enableUpdateConnections$: Observable<boolean> = this.store.select(
    (state) =>
      state[this.updateConnectionsService.stateName].enableUpdateConnections
  );

  public enableAllocateAdmin$: Observable<boolean> = this.store.select(
    (state) => state[this.recordsService.stateName].enableAllocateAdmin
  );

  constructor(
    private store: Store,
    private recordsService: RecordsService,
    private updateConnectionsService: UpdateConnectionsService
  ) {}

  onSubmitConnections(formValues: any) {
    this.updateConnections.emit(formValues);
  }
}
