import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { finalize, filter, take } from "rxjs/operators";

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
import { ITableFilters, stateName } from "../records/records.interfaces";
import {
  AutocompleteControl,
  FormControlBase
} from "../shared/form-controls/form-contol-base.model";
import { IAdmin } from "../admins/admins.interfaces";

@Injectable()
export class RecommendationsResolver
  extends RecordsResolver
  implements Resolve<any>
{
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

  private async initFiltersFormData() {
    this.admins$
      .pipe(
        filter((data) => !!data),
        take(1),
        finalize(() => {
          if (this.authService.inludesLondonDbcs) {
            TABLE_FILTERS_FORM_BASE?.push(TABLE_FILTERS_FORM_DBC);
          }
          this.recordsService.tableFiltersFormData.next(
            [...TABLE_FILTERS_FORM_BASE].sort(
              (a: FormControlBase, b: FormControlBase) => a.order - b.order
            )
          );
        })
      )
      .subscribe((admins: IAdmin[]) => {
        const tisAdminFormField = TABLE_FILTERS_FORM_BASE.find(
          ({ key }) => key === "admin"
        ) as AutocompleteControl;
        tisAdminFormField.data = admins.map((admin: IAdmin) => admin.fullName);
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

    this.recordsService.columnData$.next(generateColumnData(COLUMN_DATA));
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
    const tableFiltersState: ITableFilters = this.store.selectSnapshot(
      (snapshot) => snapshot.recommendations.tableFilters
    );
    const paramsExist: boolean = Object.keys(route.queryParams).length > 0;

    // The use case for this is when launching Reval from a bookmarked page where querystring parameters
    // have been set in order to load with filters applied.
    if (paramsExist && !tableFiltersState) {
      const filters: IRecommendationsTableFilters = {};
      if (
        route.queryParams.programmeName !== tableFiltersState?.programmeName
      ) {
        filters.programmeName = route.queryParams.programmeName;
      }
      if (route.queryParams.dbcs !== tableFiltersState?.dbcs) {
        filters.dbcs = route.queryParams.dbcs?.split(",");
      }
      if (route.queryParams.gmcStatus !== tableFiltersState?.gmcStatus) {
        filters.gmcStatus = route.queryParams.gmcStatus?.split(",");
      }
      if (route.queryParams.tisStatus !== tableFiltersState?.tisStatus) {
        filters.tisStatus = route.queryParams.tisStatus?.split(",");
      }

      if (route.queryParams.admin !== tableFiltersState?.admin) {
        filters.admin = route.queryParams.admin;
      }
      if (Object.keys(filters).length) {
        this.recordsService.setTableFilters(filters);
        this.recordsService.toggleTableFilterPanel$.next(true);
      }
    }
    return super.resolve(route);
  }
}
