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

    params = params
      .append("filter", snapshot.filter)
      .append("dbcs", this.authService.userDesignatedBodies.join(","));

    return params;
  }

  public getFilter(): ConnectionsFilterType {
    return this.store.snapshot().connections.filter;
  }
}
