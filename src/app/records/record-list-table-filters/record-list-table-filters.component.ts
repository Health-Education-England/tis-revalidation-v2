import { Component, OnInit, OnDestroy } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { Store } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";
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
export class RecordListTableFiltersComponent implements OnInit, OnDestroy {
  activeTableFilters: ITableFilters;
  formControls: (FormControlBase | AutocompleteControl)[] = [];
  form!: UntypedFormGroup;
  subscriptions: Subscription = new Subscription();
  constructor(private recordsService: RecordsService, private store: Store) {}
  public tableFilters$: Observable<any> = this.store.select(
    (state) => state[this.recordsService.stateName].tableFilters
  );

  clearFilters() {
    this.form.reset();
    this.recordsService.resetPaginator();
    this.subscriptions.add(
      this.recordsService.clearTableFilters().subscribe(() => {
        this.recordsService.updateRoute();
      })
    );
  }

  onSubmit() {
    this.recordsService.resetPaginator();
    this.subscriptions.add(
      this.recordsService.setTableFilters(this.form.value).subscribe(() => {
        this.recordsService.updateRoute();
      })
    );
  }

  ngOnInit(): void {
    this.tableFilters$.subscribe((filters: ITableFilters) => {
      if (filters) {
        this.activeTableFilters = filters;
      }
    });

    this.recordsService.onTableFilterFormReset.subscribe(() => {
      this.form.reset();
    });
    this.recordsService.tableFiltersFormData.subscribe((formData) => {
      this.formControls = formData;
      this.form = this.recordsService.toFormGroup(
        this.formControls,
        this.activeTableFilters
      );
      this.activeTableFilters && this.form.markAsDirty();
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
