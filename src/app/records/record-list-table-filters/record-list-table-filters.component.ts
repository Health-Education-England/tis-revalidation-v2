import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { IRecommendationsTableFilters } from "src/app/recommendations/recommendations.interfaces";
import {
  ControlBase,
  MaterialAutocompleteControl
} from "src/app/shared/form-controls/contol-base.model";
import { RecordsService } from "../services/records.service";

@Component({
  selector: "app-record-list-table-filters",
  templateUrl: "./record-list-table-filters.component.html",
  styleUrls: ["./record-list-table-filters.component.scss"]
})
export class RecordListTableFiltersComponent implements OnInit {
  filters: any;
  meta: (ControlBase | MaterialAutocompleteControl)[] = [];
  @Input() data: any = {};
  form!: FormGroup;
  payLoad = "";
  constructor(private recordsService: RecordsService, private store: Store) {}
  public tableFilters$: Observable<IRecommendationsTableFilters> =
    this.store.select(
      (state) => state[this.recordsService.stateName].tableFilters
    );

  clearFilters() {
    this.form.reset();
    this.recordsService.clearTableFilters().subscribe(() => {
      this.recordsService.updateRoute();
    });
  }

  onSubmit() {
    this.recordsService.setTableFilters(this.form.value).subscribe(() => {
      this.recordsService.updateRoute();
    });
  }
  ngOnInit(): void {
    if (this.recordsService.tableFiltersFormData) {
      this.meta = this.recordsService.tableFiltersFormData;
      this.form = this.recordsService.toFormGroup(
        this.recordsService.tableFiltersFormData,
        this.data
      );
      console.log(this.form);
      this.tableFilters$.subscribe((val) => {
        this.filters = val;
      });
    }
  }
}
