import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { RecordsService } from "../../records/services/records.service";
import { ConnectionsFilterType } from "../connections.interfaces";
import { ConnectionsStateModel } from "../state/connections.state";
import { AuthService } from "../../core/auth/auth.service";
import { AdminsStateModel } from "src/app/admins/state/admins.state";
import { IAdmin } from "src/app/admins/admins.interfaces";
@Injectable({
  providedIn: "root"
})
export class ConnectionsService {
  constructor(
    private store: Store,
    private recordsService: RecordsService,
    private authService: AuthService
  ) {}

  public generateParams(): HttpParams {
    const snapshot: ConnectionsStateModel = this.store.snapshot().connections;
    const admins: AdminsStateModel = this.store.snapshot().admins;
    let params: HttpParams = this.recordsService.generateParams(snapshot);
    let updatedByParam: string;
    if (snapshot.tableFilters?.updatedBy && admins.items) {
      const selectedAdmin = admins.items?.find(
        (admin: IAdmin) => admin.fullName === snapshot.tableFilters.updatedBy
      );
      updatedByParam = selectedAdmin?.email || snapshot.tableFilters.updatedBy;
    }

    params = params
      .append("filter", snapshot.filter)
      .append("programmeName", snapshot.tableFilters?.programmeName || "")
      .append(
        "membershipEndDateFrom",
        snapshot.tableFilters?.membershipEndDateFrom || ""
      )
      .append(
        "membershipEndDateTo",
        snapshot.tableFilters?.membershipEndDateTo || ""
      )
      .append(
        "submissionDateFrom",
        snapshot.tableFilters?.submissionDateFrom || ""
      )
      .append("submissionDateTo", snapshot.tableFilters?.submissionDateTo || "")
      .append(
        "lastConnectionDateTimeFrom",
        snapshot.tableFilters?.lastConnectionDateTimeFrom || ""
      )
      .append(
        "lastConnectionDateTimeTo",
        snapshot.tableFilters?.lastConnectionDateTimeTo || ""
      )
      .append("updatedBy", updatedByParam || "");

    if (snapshot.filter === "discrepancies") {
      let isDBSelected =
        snapshot.tableFilters?.dbcs?.toString().length > 0 ||
        snapshot.tableFilters?.tisDesignatedBodies?.toString().length > 0;
      params = params
        .append(
          "dbcs",
          snapshot.tableFilters && isDBSelected
            ? snapshot.tableFilters.dbcs?.toString()
            : this.authService.userDesignatedBodies.join(",")
        )
        .append(
          "tisDesignatedBodies",
          snapshot.tableFilters && isDBSelected
            ? snapshot.tableFilters.tisDesignatedBodies?.toString()
            : this.authService.userDesignatedBodies.join(",")
        );
    } else {
      params = params.append(
        "dbcs",
        this.authService.userDesignatedBodies.join(",")
      );
    }
    return params;
  }

  public getFilter(): ConnectionsFilterType {
    return this.store.snapshot().connections.filter;
  }
}
