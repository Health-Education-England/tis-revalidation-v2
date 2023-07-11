import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { generateColumnData } from "../records/constants";
import { RecordsResolver } from "../records/records.resolver";
import { RecordsService } from "../records/services/records.service";
import { UpdateConnectionsService } from "../update-connections/services/update-connections.service";
import {
  ConnectionsFilterType,
  IConnectionsTableFilters
} from "./connections.interfaces";
import { COLUMN_DATA } from "./constants";
import { ITableFilters, stateName } from "../records/records.interfaces";
import { TABLE_FILTERS_FORM_BASE } from "../connections/constants";
import { FormControlBase } from "../shared/form-controls/form-contol-base.model";
@Injectable()
export class ConnectionsResolver
  extends RecordsResolver
  implements Resolve<any>
{
  constructor(
    protected store: Store,
    protected recordsService: RecordsService,
    protected updateConnectionsService: UpdateConnectionsService
  ) {
    super(store, recordsService, updateConnectionsService);
    this.initialiseData();
  }

  private initialiseData(): void {
    this.recordsService.stateName = stateName.CONNECTIONS;
    this.recordsService.detailsRoute = "/connection";
    this.recordsService.showTableFilters = true;
    this.recordsService.setConnectionsActions();
    this.recordsService.dateColumns = [
      "submissionDate",
      "programmeMembershipStartDate",
      "programmeMembershipEndDate"
    ];
    this.recordsService.columnData = generateColumnData(COLUMN_DATA);
    this.recordsService.filters = [
      {
        label: "CURRENT CONNECTIONS",
        name: ConnectionsFilterType.CURRENT_CONNECTIONS
      },
      {
        label: "DISCREPANCIES",
        name: ConnectionsFilterType.DISCREPANCIES
      }
    ];

    this.recordsService.tableFiltersFormData.next(
      [...TABLE_FILTERS_FORM_BASE].sort(
        (a: FormControlBase, b: FormControlBase) => a.order - b.order
      )
    );
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const tableFiltersState: ITableFilters = this.store.selectSnapshot(
      (snapshot) => snapshot.connections.tableFilters
    );
    const paramsExist: boolean = Object.keys(route.queryParams).length > 0;

    if (paramsExist) {
      const filters: IConnectionsTableFilters = {};

      filters.programmeName =
        tableFiltersState?.programmeName || route.queryParams.programmeName;

      if (Object.keys(filters).length) {
        this.recordsService.setTableFilters(filters);
        this.recordsService.toggleTableFilterPanel$.next(true);
      }
    } else {
      this.recordsService.clearTableFilters();
      this.recordsService.toggleTableFilterPanel$.next(false);
      this.recordsService.resetTableFiltersForm();
    }
    return super.resolve(route);
  }
}
