import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { RecordsService } from "../../shared/records/services/records.service";
import { TraineesStateModel } from "../state/trainees.state";
import { TraineesFilterType } from "../trainees.interfaces";

@Injectable({
  providedIn: "root"
})
export class TraineesService {
  constructor(private store: Store, private recordsService: RecordsService) {}

  public generateParams(): HttpParams {
    const snapshot: TraineesStateModel = this.store.snapshot().trainees;
    let params: HttpParams = this.recordsService.generateParams(snapshot);

    params = params.append(
      TraineesFilterType.UNDER_NOTICE,
      snapshot.filter === TraineesFilterType.UNDER_NOTICE ? "true" : "false"
    );

    return params;
  }
}
