import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { RecordsService } from "../../records/services/records.service";
import { RecommendationsStateModel } from "../state/recommendations.state";
import { RecommendationsFilterType } from "../recommendations.interfaces";

@Injectable({
  providedIn: "root"
})
export class RecommendationsService {
  constructor(private store: Store, private recordsService: RecordsService) {}

  public generateParams(): HttpParams {
    const snapshot: RecommendationsStateModel = this.store.snapshot()
      .recommendations;
    let params: HttpParams = this.recordsService.generateParams(snapshot);

    params = params.append(
      RecommendationsFilterType.UNDER_NOTICE,
      snapshot.filter === RecommendationsFilterType.UNDER_NOTICE
        ? "true"
        : "false"
    );

    return params;
  }
}
