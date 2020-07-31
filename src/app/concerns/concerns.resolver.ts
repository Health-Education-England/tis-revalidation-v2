import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { RecordsResolver } from "../records/records.resolver";
import { RecordsService } from "../records/services/records.service";
import {
  ClearConcernsSearch,
  FilterConcerns,
  GetConcerns,
  PaginateConcerns,
  ResetConcernsFilter,
  ResetConcernsPaginator,
  ResetConcernsSort,
  ConcernsSearch,
  SortConcerns,
  EnableConcernsAllocateAdmin,
  ToggleConcernsCheckbox,
  ToggleAllConcernsCheckboxes
} from "./state/concerns.actions";

@Injectable()
export class ConcernsResolver extends RecordsResolver implements Resolve<any> {
  constructor(
    protected store: Store,
    protected recordsService: RecordsService
  ) {
    super(store, recordsService);
    this.recordsService.stateName = "concerns";
    this.recordsService.setActions(
      ClearConcernsSearch,
      FilterConcerns,
      GetConcerns,
      PaginateConcerns,
      ResetConcernsFilter,
      ResetConcernsPaginator,
      ResetConcernsSort,
      ConcernsSearch,
      SortConcerns,
      EnableConcernsAllocateAdmin,
      ToggleConcernsCheckbox,
      ToggleAllConcernsCheckboxes
    );
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return super.resolve(route);
  }
}
