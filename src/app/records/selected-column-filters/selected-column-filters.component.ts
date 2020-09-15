import { Component, OnInit } from "@angular/core";
import { RecordsState } from "../state/records.state";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { RecordsService } from "../services/records.service";

@Component({
  selector: "app-selected-column-filters",
  templateUrl: "./selected-column-filters.component.html",
  styleUrls: ["./selected-column-filters.component.scss"]
})
export class SelectedColumnFiltersComponent implements OnInit {
  // @Select(RecordsState.columnFilters)
  // public columnFilters$: Observable<any>;

  public columnFilters$: Observable<any> = this.store.select(
    (state) => state[this.recordsService.stateName].columnFilters
  );
  constructor(private store: Store, private recordsService: RecordsService) {}

  ngOnInit(): void {}

  public removeFilter(
    column: {
      [x: string]: any;
    }[],
    name: string,
    value: string
  ): void {
    const filteredColumn = {
      [name]: column[name].filter((x: string) => x !== value)
    };
    this.recordsService.selectFilter(filteredColumn);
  }

  public removeAllFilters(): void {
    this.recordsService.resetFilters();
  }
}
