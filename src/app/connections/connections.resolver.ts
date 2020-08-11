import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { generateColumnData } from "../records/constants";
import { RecordsResolver } from "../records/records.resolver";
import { RecordsService } from "../records/services/records.service";
import { COLUMN_DATA } from "./constants";

@Injectable()
export class ConnectionsResolver extends RecordsResolver
  implements Resolve<any> {
  constructor(
    protected store: Store,
    protected recordsService: RecordsService
  ) {
    super(store, recordsService);
    this.initialiseData();
  }

  private initialiseData(): void {
    this.recordsService.stateName = "connections";
    this.recordsService.detailsRoute = "/connection";
    this.recordsService.setConnectionsActions();
    this.recordsService.dateColumns = [
      "submissionDate",
      "programmeMembershipStartDate",
      "programmeMembershipEndDate"
    ];
    this.recordsService.columnData = generateColumnData(COLUMN_DATA);
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return super.resolve(route);
  }
}
