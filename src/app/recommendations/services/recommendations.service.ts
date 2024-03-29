import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { RecordsService } from "../../records/services/records.service";
import { RecommendationsStateModel } from "../state/recommendations.state";
import { RecommendationsFilterType } from "../recommendations.interfaces";
import { AuthService } from "src/app/core/auth/auth.service";
import { IAdmin } from "src/app/admins/admins.interfaces";
import { AdminsStateModel } from "src/app/admins/state/admins.state";

@Injectable({
  providedIn: "root"
})
export class RecommendationsService {
  constructor(
    private store: Store,
    private recordsService: RecordsService,
    private authService: AuthService
  ) {}

  public generateParams(): HttpParams {
    const snapshot: RecommendationsStateModel =
      this.store.snapshot().recommendations;
    const admins: AdminsStateModel = this.store.snapshot().admins;

    let params: HttpParams = this.recordsService.generateParams(snapshot);

    let dbcFilters: string[] = [];
    if (snapshot.tableFilters?.dbcs) {
      dbcFilters = snapshot.tableFilters.dbcs.filter((dbc) =>
        this.authService.userDesignatedBodies.find((userDbc) => dbc === userDbc)
      );
    }

    let adminEmail: string = "";
    if (snapshot.tableFilters?.admin && admins.items) {
      adminEmail = admins.items?.find(
        (admin: IAdmin) => admin.fullName === snapshot.tableFilters.admin
      )?.email;
    }

    params = params
      .append(
        RecommendationsFilterType.UNDER_NOTICE,
        snapshot.filter === RecommendationsFilterType.UNDER_NOTICE
          ? "true"
          : "false"
      )
      .append(
        "dbcs",
        dbcFilters?.join(",") || this.authService.userDesignatedBodies.join(",")
      )
      .append("programmeName", snapshot.tableFilters?.programmeName || "")
      .append("gmcStatus", snapshot.tableFilters?.gmcStatus?.join(",") || "")
      .append("tisStatus", snapshot.tableFilters?.tisStatus?.join(",") || "")
      .append("admin", adminEmail);

    return params;
  }
}
