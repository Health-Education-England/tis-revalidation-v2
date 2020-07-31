import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { RecordsService } from "../../records/services/records.service";
import { ConcernsStateModel } from "../state/concerns.state";

@Injectable({
  providedIn: "root"
})
export class ConcernsService {
  constructor(private store: Store, private recordsService: RecordsService) {}

  public generateParams(): HttpParams {
    const snapshot: ConcernsStateModel = this.store.snapshot().concerns;
    let params: HttpParams = this.recordsService.generateParams(snapshot);

    params = params.append("filter", snapshot.filter);

    return params;
  }
}
