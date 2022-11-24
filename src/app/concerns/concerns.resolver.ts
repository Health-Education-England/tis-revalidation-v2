import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { ConcernStatus } from "../concern/concern.interfaces";
import { generateColumnData } from "../records/constants";
import { RecordsResolver } from "../records/records.resolver";
import { RecordsService } from "../records/services/records.service";
import { UpdateConnectionsService } from "../update-connections/services/update-connections.service";
import { COLUMN_DATA } from "./constants";

@Injectable()
export class ConcernsResolver extends RecordsResolver implements Resolve<any> {
  constructor(
    protected store: Store,
    protected recordsService: RecordsService,
    protected updateConnectionsService: UpdateConnectionsService
  ) {
    super(store, recordsService, updateConnectionsService);
    this.initialiseData();
  }

  private initialiseData(): void {
    this.recordsService.stateName = "concerns";
    this.recordsService.detailsRoute = "/concern";
    this.recordsService.showTableFilters = false;
    this.recordsService.setConcernsActions();
    this.recordsService.dateColumns = [
      "closedDate",
      "dateRaised",
      "dateAdded",
      "followUpDate"
    ];
    this.recordsService.columnData$.next(generateColumnData(COLUMN_DATA));
    this.recordsService.filters = [
      {
        label: "OPEN",
        name: ConcernStatus.OPEN
      },
      {
        label: "CLOSED",
        name: ConcernStatus.CLOSED
      }
    ];
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return super.resolve(route);
  }
}
