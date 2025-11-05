import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";

import { generateColumnData } from "../records/constants";
import { RecordsResolver } from "../records/records.resolver";
import { RecordsService } from "../records/services/records.service";
import {
  COLUMN_DATA,
  TABLE_FILTERS_FORM_BASE,
  TABLE_FILTERS_FORM_DBC
} from "./constants";
import {
  IRecommendationsTableFilters,
  RecommendationsFilterType
} from "./recommendations.interfaces";
import { AuthService } from "../core/auth/auth.service";
import { UpdateConnectionsService } from "../update-connections/services/update-connections.service";
import { stateName } from "../records/records.interfaces";
import {
  AutocompleteControl,
  FormControlBase
} from "../shared/form-controls/form-contol-base.model";
import { IAdmin } from "../admins/admins.interfaces";

@Injectable()
export class RecommendationsResolver extends RecordsResolver {
  constructor(
    protected store: Store,
    protected recordsService: RecordsService,
    private authService: AuthService,
    protected updateConnectionsService: UpdateConnectionsService
  ) {
    super(store, recordsService, updateConnectionsService);
    this.initialiseData();
  }

  admins$: Observable<IAdmin[]> = this.store.select(
    (state) => state.admins.items
  );

  private initFiltersFormData() {
    if (this.authService.inludesLondonDbcs) {
      TABLE_FILTERS_FORM_BASE?.push(TABLE_FILTERS_FORM_DBC);
    }
    this.recordsService.tableFiltersFormData.next(
      [...TABLE_FILTERS_FORM_BASE].sort(
        (a: FormControlBase, b: FormControlBase) => a.order - b.order
      )
    );

    this.admins$.subscribe((admins: IAdmin[]) => {
      const tisAdminFormField = TABLE_FILTERS_FORM_BASE.find(
        ({ key }) => key === "admin"
      ) as AutocompleteControl;
      tisAdminFormField.data = admins?.map((admin: IAdmin) => admin.fullName);
    });
  }
  private initialiseData(): void {
    this.recordsService.stateName = stateName.RECOMMENDATIONS;
    this.recordsService.detailsRoute = "/recommendation";
    this.recordsService.showTableFilters = true;
    this.recordsService.setRecommendationsActions();
    this.recordsService.dateColumns = [
      "curriculumEndDate",
      "submissionDate",
      "dateAdded",
      "lastUpdatedDate"
    ];

    this.initFiltersFormData();

    if (this.authService.inludesLondonDbcs) {
      const statusIndex = COLUMN_DATA.findIndex((dbc) => dbc[0] === "Status");
      COLUMN_DATA.splice(statusIndex + 1, 0, [
        "Designated body",
        "designatedBody",
        false
      ]);
    }

    this.recordsService.columnData = generateColumnData(COLUMN_DATA);
    this.recordsService.filters = [
      {
        label: "ALL DOCTORS",
        name: RecommendationsFilterType.ALL_DOCTORS
      },
      {
        label: "UNDER NOTICE",
        name: RecommendationsFilterType.UNDER_NOTICE
      }
    ];
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const tableFiltersState: IRecommendationsTableFilters =
      this.store.selectSnapshot(
        (snapshot) => snapshot.recommendations.tableFilters
      );

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
      const filters: IRecommendationsTableFilters = {};
      TABLE_FILTERS_FORM_BASE.forEach((filter) => {
        filters[filter.key] = filter.options
          ? route.queryParams[filter.key]?.split(",")
          : route.queryParams[filter.key];
      });

      if (Object.values(filters).some((filter) => filter)) {
        this.recordsService.setTableFilters(filters);
        this.recordsService.toggleTableFilterPanel$.next(true);
      }
    }

    return super.resolve(route);
  }
}
