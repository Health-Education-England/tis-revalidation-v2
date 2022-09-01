import { Component, OnInit } from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { IRecommendationsTableFilters } from "src/app/recommendations/recommendations.interfaces";
import { RecordsService } from "../services/records.service";

@Component({
  selector: "app-record-list-table-filters",
  templateUrl: "./record-list-table-filters.component.html",
  styleUrls: ["./record-list-table-filters.component.scss"]
})
export class RecordListTableFiltersComponent implements OnInit {
  filters: any;
  constructor(private recordsService: RecordsService, private store: Store) {}
  public tableFilters$: Observable<IRecommendationsTableFilters> =
    this.store.select(
      (state) => state[this.recordsService.stateName].tableFilters
    );
  onFilter() {
    this.recordsService
      .setTableFilters({
        programeName: "HELLO",
        gmcStatus: "BUM"
      })
      .subscribe(() => this.recordsService.updateRoute());
  }
  clearFilters() {
    this.recordsService.clearTableFilters();
  }

  onShow() {
    alert("Show button clicked!");
  }
  ngOnInit(): void {
    this.tableFilters$.subscribe((val) => {
      this.filters = val;
    });
  }
}
