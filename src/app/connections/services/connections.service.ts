import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { RecordsService } from "../../records/services/records.service";
import { ConnectionsFilterType } from "../connections.interfaces";
import { ConnectionsStateModel } from "../state/connections.state";
import { AuthService } from "../../core/auth/auth.service";

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
    let params: HttpParams = this.recordsService.generateParams(snapshot);
    snapshot.tableFilters?.programmeEndDateStart;
    params = params
      .append("filter", snapshot.filter)
      .append("programmeName", snapshot.tableFilters?.programmeName || "")
      .append(
        "programmeEndDateStart",
        snapshot.tableFilters?.programmeEndDateStart || ""
      )
      .append(
        "programmeEndDateEnd",
        snapshot.tableFilters?.programmeEndDateEnd || ""
      );

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
