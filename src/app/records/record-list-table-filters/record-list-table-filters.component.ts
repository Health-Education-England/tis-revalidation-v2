import { Component, OnInit, OnDestroy } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { Store } from "@ngxs/store";
import { combineLatest, concatMap, Observable, Subscription } from "rxjs";
import {
  FormControlBase,
  AutocompleteControl
} from "src/app/shared/form-controls/form-contol-base.model";
import { ITableFilters } from "../records.interfaces";
import { RecordsService } from "../services/records.service";
import { UtilitiesService } from "src/app/shared/services/utilities/utilities.service";

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
  constructor(
    private recordsService: RecordsService,
    private store: Store,
    readonly utilitiesService: UtilitiesService
  ) {}
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
    const formData = this.utilitiesService.flattenObject(
      JSON.parse(JSON.stringify(this.form.value))
    );
    this.subscriptions.add(
      this.recordsService.setTableFilters(formData).subscribe(() => {
        this.recordsService.updateRoute();
      })
    );
  }

  ngOnInit(): void {
    combineLatest([
      this.recordsService.tableFiltersFormData,
      this.tableFilters$
    ])
      .pipe(
        concatMap(([formControls, activeFilters]) => {
          this.formControls = formControls;

          this.form = this.recordsService.toFormGroup(
            formControls,
            activeFilters || {}
          );
          return this.form.valueChanges;
        })
      )
      .subscribe(() => {
        this.onSubmit();
      });

    this.recordsService.onTableFilterFormReset.subscribe(() => {
      this.form.reset();
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
