import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { generateColumnData } from "../records/constants";
import { RecordsResolver } from "../records/records.resolver";
import { RecordsService } from "../records/services/records.service";
import { COLUMN_DATA } from "./constants";
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
    this.initialiseData();
  }

  private initialiseData(): void {
    this.recordsService.stateName = "concerns";
    this.recordsService.detailsRoute = "/concern";
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
    this.recordsService.dateColumns = [
      "closedDate",
      "dateRaised",
      "dateAdded",
      "followUpDate"
    ];
    this.recordsService.columnData = generateColumnData(COLUMN_DATA);
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return super.resolve(route);
  }
}
