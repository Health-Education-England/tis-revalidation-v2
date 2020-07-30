import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { RecordsService } from "../../records/services/records.service";
import { ConnectionsStateModel } from "../state/connections.state";

@Injectable({
  providedIn: "root"
})
export class ConnectionsService {
  constructor(private store: Store, private recordsService: RecordsService) {}

  public generateParams(): HttpParams {
    const snapshot: ConnectionsStateModel = this.store.snapshot().connections;
    let params: HttpParams = this.recordsService.generateParams(snapshot);

    params = params.append("filter", snapshot.filter);

    return params;
  }
}
