import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { IRecommendationsTableFilters } from "src/app/recommendations/recommendations.interfaces";
import { ControlBase } from "src/app/shared/form-controls/contol-base.model";
import { RecordsService } from "../services/records.service";

@Component({
  selector: "app-record-list-table-filters",
  templateUrl: "./record-list-table-filters.component.html",
  styleUrls: ["./record-list-table-filters.component.scss"]
})
export class RecordListTableFiltersComponent implements OnInit {
  filters: any;
  @Input() meta: ControlBase[] = [
    {
      key: "country",
      options: [
        { key: "IN", value: "India" },
        { key: "USA", value: "United States of America" },
        { key: "UK", value: "United Kingdom" }
      ],
      order: 8,
      controlType: "selectionList",
      initialValue: []
    }
  ];
  @Input() data: any = {};
  form!: FormGroup;
  payLoad = "";
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

  onSubmit() {
    alert("Show button clicked!");
  }
  ngOnInit(): void {
    this.form = this.recordsService.toFormGroup(this.meta, this.data);
    this.tableFilters$.subscribe((val) => {
      this.filters = val;
    });
  }
}
