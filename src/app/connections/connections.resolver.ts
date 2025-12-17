import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { Store } from "@ngxs/store";
import { Observable, of } from "rxjs";
import { RECORDS_COLUMN_DATA } from "../records/constants";
import { RecordsResolver } from "../records/records.resolver";
import { RecordsService } from "../records/services/records.service";
import { UpdateConnectionsService } from "../update-connections/services/update-connections.service";
import {
  ConnectionsFilterType,
  IConnectionsTableFilters
} from "./connections.interfaces";
import {
  COLUMN_DATA,
  TABLE_FILTERS_FORM_DBC_LONDON,
  TABLE_FILTERS_FORM_DBC
} from "./constants";
import { stateName } from "../records/records.interfaces";
import { TABLE_FILTERS_FORM_BASE } from "../connections/constants";
import { FormControlBase } from "../shared/form-controls/form-contol-base.model";
import { AuthService } from "../core/auth/auth.service";
@Injectable()
export class ConnectionsResolver extends RecordsResolver {
  constructor(
    protected store: Store,
    protected recordsService: RecordsService,
    protected updateConnectionsService: UpdateConnectionsService,
    readonly authService: AuthService
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
      "programmeMembershipEndDate",
      "lastConnectionDateTime"
    ];
    this.recordsService.columnData = [...RECORDS_COLUMN_DATA, ...COLUMN_DATA];

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
        label: "FAILED GMC UPDATES",
        name: ConnectionsFilterType.EXCEPTIONSLOG
      }
    ];

    if (this.authService.inludesLondonDbcs) {
      TABLE_FILTERS_FORM_BASE?.push(...TABLE_FILTERS_FORM_DBC_LONDON);
    } else {
      TABLE_FILTERS_FORM_BASE?.push(...TABLE_FILTERS_FORM_DBC);
    }

    this.recordsService.tableFiltersFormData.next(
      [...TABLE_FILTERS_FORM_BASE].sort(
        (a: FormControlBase, b: FormControlBase) => a.order - b.order
      )
    );
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    if (route.queryParams.filter === ConnectionsFilterType.EXCEPTIONSLOG) {
      this.recordsService.filter(route.queryParams.filter);
      return of(null);
    }

    const tableFiltersState: IConnectionsTableFilters =
      this.store.selectSnapshot(
        (snapshot) => snapshot.connections.tableFilters
      );

    const filterKeys = TABLE_FILTERS_FORM_BASE.flatMap((tableFilter: any) => {
      if (tableFilter.controlType === "daterange") {
        return [
          tableFilter.key + tableFilter.startRangeControl,
          tableFilter.key + tableFilter.endRangeControl
        ];
      }
      return tableFilter.key;
    });

    const filterParamsExists = Object.keys(route.queryParams).some((param) =>
      filterKeys.includes(param)
    );

    if (tableFiltersState && !filterParamsExists) {
      this.recordsService.clearTableFilters();
      this.recordsService.toggleTableFilterPanel$.next(false);
      this.recordsService.resetTableFiltersForm();
    } else {
      const filters: IConnectionsTableFilters = {};
      filterKeys.forEach((filterKey) => {
        filters[filterKey] = TABLE_FILTERS_FORM_BASE.find(
          (item) => item.key === filterKey
        )?.options
          ? route.queryParams[filterKey]?.split(",")
          : route.queryParams[filterKey];
      });

      if (Object.values(filters).some((filter) => filter)) {
        this.recordsService.setTableFilters(filters);
        this.recordsService.toggleTableFilterPanel$.next(true);
      }
    }
    return super.resolve(route);
  }
}
