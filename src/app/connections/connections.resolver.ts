import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { RecordsResolver } from "../shared/records/records.resolver";
import { RecordsService } from "../shared/records/services/records.service";
import {
  ClearConnectionsSearch,
  FilterConnections,
  GetConnections,
  PaginateConnections,
  ResetConnectionsFilter,
  ResetConnectionsPaginator,
  ResetConnectionsSort,
  ConnectionsSearch,
  SortConnections,
  EnableConnectionsAllocateAdmin,
  ToggleConnectionsCheckbox,
  ToggleAllConnectionsCheckboxes
} from "./state/connections.actions";

@Injectable()
export class ConnectionsResolver extends RecordsResolver
  implements Resolve<any> {
  constructor(
    protected store: Store,
    protected recordsService: RecordsService
  ) {
    super(store, recordsService);
    this.recordsService.stateName = "connections";
    this.recordsService.setActions(
      ClearConnectionsSearch,
      FilterConnections,
      GetConnections,
      PaginateConnections,
      ResetConnectionsFilter,
      ResetConnectionsPaginator,
      ResetConnectionsSort,
      ConnectionsSearch,
      SortConnections,
      EnableConnectionsAllocateAdmin,
      ToggleConnectionsCheckbox,
      ToggleAllConnectionsCheckboxes
    );
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return super.resolve(route);
  }
}
