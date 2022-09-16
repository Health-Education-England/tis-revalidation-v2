import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Params, Resolve } from "@angular/router";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { generateColumnData } from "../records/constants";
import { RecordsResolver } from "../records/records.resolver";
import { RecordsService } from "../records/services/records.service";
import { COLUMN_DATA, TABLE_FILTERS_FORM_BASE } from "./constants";
import {
  IRecommendationsTableFilters,
  RecommendationsFilterType
} from "./recommendations.interfaces";
import { AuthService } from "../core/auth/auth.service";
import { UpdateConnectionsService } from "../update-connections/services/update-connections.service";
import { stateName } from "../records/records.interfaces";
import { FormControlBase } from "../shared/form-controls/form-contol-base.model";
import { RecommendationsStateModel } from "./state/recommendations.state";
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

    if (this.authService.inludesLondonDbcs) {
      const statusIndex = COLUMN_DATA.findIndex((dbc) => dbc[0] === "Status");
      COLUMN_DATA.splice(statusIndex + 1, 0, [
        "Designated body",
        "designatedBody",
        false
      ]);
    }

    this.recordsService.tableFiltersFormData = TABLE_FILTERS_FORM_BASE.sort(
      (a: FormControlBase, b: FormControlBase) => a.order - b.order
    );

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
    const paramsExist: boolean = Object.keys(route.queryParams).length > 0;
    if (paramsExist) {
      const state: RecommendationsStateModel = this.store.selectSnapshot(
        (snapshot) => snapshot.recommendations
      );

      const filters: IRecommendationsTableFilters = {};
      if (
        route.queryParams.programmeName !== state.tableFilters?.programmeName
      ) {
        filters.programmeName = route.queryParams.programmeName;

        this.recordsService.setTableFilters(filters);
        this.recordsService.toggleTableFilterPanel$.next(true);
      }
    }
    return super.resolve(route);
  }
}
