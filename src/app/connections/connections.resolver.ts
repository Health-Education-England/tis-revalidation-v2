import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { Store } from "@ngxs/store";
import { Observable, of } from "rxjs";
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
export class ConnectionsResolver extends RecordsResolver {
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
      },
      {
        label: "HIDDEN",
        name: ConnectionsFilterType.HIDDEN
      },

      {
        label: "FAILED GMC UPDATES",
        name: ConnectionsFilterType.EXCEPTIONSLOG
      }
    ];

    this.recordsService.tableFiltersFormData.next(
      [...TABLE_FILTERS_FORM_BASE].sort(
        (a: FormControlBase, b: FormControlBase) => a.order - b.order
      )
    );
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const tableFiltersState: IConnectionsTableFilters =
      this.store.selectSnapshot(
        (snapshot) => snapshot.connections.tableFilters
      );
    if (route.queryParams.filter === ConnectionsFilterType.EXCEPTIONSLOG) {
      this.recordsService.filter(route.queryParams.filter);
      return of(null);
    }
    const filterParamsExists = Object.keys(route.queryParams).some((param) =>
      TABLE_FILTERS_FORM_BASE.map((tableFilter) => tableFilter.key).includes(
        param
      )
    );

    if (tableFiltersState && !filterParamsExists) {
      this.recordsService.clearTableFilters();
      this.recordsService.toggleTableFilterPanel$.next(false);
      this.recordsService.resetTableFiltersForm();
    } else {
      const filters: IConnectionsTableFilters = {};
      TABLE_FILTERS_FORM_BASE.forEach((filter) => {
        if (!Array.isArray(filter.key)) {
          filters[filter.key] = filter.options
            ? route.queryParams[filter.key]?.split(",")
            : route.queryParams[filter.key];
        }
      });

      if (Object.values(filters).some((filter) => filter)) {
        this.recordsService.setTableFilters(filters);
        this.recordsService.toggleTableFilterPanel$.next(true);
      }
    }
    return super.resolve(route);
  }
}
