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

@Component({
  selector: "app-records",
  templateUrl: "./records.component.html",
  styleUrls: ["./records.component.scss"]
})
export class RecordsComponent implements OnInit {
  @Output() updateConnections = new EventEmitter<any>();
  @Input() public loading: boolean;
  filterPanelOpen: boolean;
  public subscriptions: Subscription = new Subscription();
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
  ngOnInit(): void {
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
