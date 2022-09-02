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
  meta: ControlBase[] = [];
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
    this.meta = this.recordsService.tableFiltersForm.sort(
      (a: ControlBase, b: ControlBase) => a.order - b.order
    );
    this.form = this.recordsService.toFormGroup(this.meta, this.data);
    this.tableFilters$.subscribe((val) => {
      this.filters = val;
    });
  }
}
