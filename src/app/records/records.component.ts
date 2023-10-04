import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy
} from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";
import { UpdateConnectionsService } from "../update-connections/services/update-connections.service";
import { RecordsService } from "./services/records.service";
import { ConnectionsFilterType } from "../connections/connections.interfaces";

@Component({
  selector: "app-records",
  templateUrl: "./records.component.html",
  styleUrls: ["./records.component.scss"]
})
export class RecordsComponent implements OnInit, OnDestroy {
  @Output() updateConnections = new EventEmitter<any>();
  @Input() public loading: boolean;
  showTableFilters: boolean;
  filterPanelOpen: boolean;
  exceptionsLogFilter = ConnectionsFilterType.EXCEPTIONSLOG;
  public subscriptions: Subscription = new Subscription();
  public enableUpdateConnections$: Observable<boolean> = this.store.select(
    (state) =>
      state[this.updateConnectionsService.stateName].enableUpdateConnections
  );

  public enableAllocateAdmin$: Observable<boolean> = this.store.select(
    (state) => state[this.recordsService.stateName].enableAllocateAdmin
  );

  public filter$: Observable<string> = this.store.select(
    (state) => state[this.recordsService.stateName].filter
  );
  constructor(
    private store: Store,
    private recordsService: RecordsService,
    private updateConnectionsService: UpdateConnectionsService
  ) {}
  ngOnInit(): void {
    this.showTableFilters = this.recordsService.showTableFilters;
    this.subscriptions.add(
      this.recordsService.toggleTableFilterPanel$.subscribe(
        (isOpen: boolean) => {
          this.filterPanelOpen = isOpen;
        }
      )
    );
  }

  onSubmitConnections(formValues: any) {
    this.updateConnections.emit(formValues);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
