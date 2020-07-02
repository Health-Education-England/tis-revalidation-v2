import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { RecordsResolver } from "../shared/records/records.resolver";
import { RecordsService } from "../shared/records/services/records.service";
import {
  ClearSearch,
  EnableAllocateAdmin,
  Filter,
  Get,
  Paginate,
  ResetFilter,
  ResetPaginator,
  ResetSort,
  Search,
  Sort
} from "./state/recommendations.actions";

@Injectable()
export class RecommendationsResolver extends RecordsResolver
  implements Resolve<any> {
  constructor(
    protected store: Store,
    protected recordsService: RecordsService
  ) {
    super(store, recordsService);
    this.recordsService.stateName = "recommendations";
    this.recordsService.setActions(
      ClearSearch,
      Filter,
      Get,
      Paginate,
      ResetFilter,
      ResetPaginator,
      ResetSort,
      Search,
      Sort,
      EnableAllocateAdmin
    );
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return super.resolve(route);
  }
}
