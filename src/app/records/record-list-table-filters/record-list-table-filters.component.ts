import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import {
  FormControlBase,
  AutocompleteControl
} from "src/app/shared/form-controls/form-contol-base.model";
import { ITableFilters } from "../records.interfaces";
import { RecordsService } from "../services/records.service";

@Component({
  selector: "app-record-list-table-filters",
  templateUrl: "./record-list-table-filters.component.html",
  styleUrls: ["./record-list-table-filters.component.scss"]
})
export class RecordListTableFiltersComponent implements OnInit {
  activeTableFilters: ITableFilters;
  formControls: (FormControlBase | AutocompleteControl)[] = [];
  form!: FormGroup;
  constructor(private recordsService: RecordsService, private store: Store) {}
  public tableFilters$: Observable<any> = this.store.select(
    (state) => state[this.recordsService.stateName].tableFilters
  );

  clearFilters() {
    this.form.reset();
    this.recordsService.resetPaginator();
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
    this.tableFilters$.subscribe((filters) => {
      if (filters) {
        this.activeTableFilters = filters;
      }
    });
    if (this.recordsService.tableFiltersFormData) {
      this.formControls = this.recordsService.tableFiltersFormData;
      this.form = this.recordsService.toFormGroup(
        this.formControls,
        this.activeTableFilters
      );
      this.activeTableFilters && this.form.markAsDirty();
    }
  }
}
