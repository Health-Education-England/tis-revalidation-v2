import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Store } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";
import { filter, take } from "rxjs/operators";
import { AuthService } from "src/app/core/auth/auth.service";
import { UpdateConnectionsService } from "src/app/update-connections/services/update-connections.service";
import { ToggleFixedColumns } from "../record-list/state/record-list.actions";
import { stateName } from "../records.interfaces";
import { RecordsService } from "../services/records.service";

@Component({
  selector: "app-record-search",
  templateUrl: "./record-search.component.html",
  styleUrls: ["./record-search.component.scss"]
})
export class RecordSearchComponent implements OnInit, OnDestroy {
  public searchQuery$: Observable<string> = this.store.select(
    (state) => state[this.recordsService.stateName].searchQuery
  );
  public enableAllocateAdmin$: Observable<boolean> = this.store.select(
    (state) => state[this.recordsService.stateName].enableAllocateAdmin
  );
  public enableUpdateConnections$: Observable<boolean> = this.store.select(
    (state) =>
      state[this.updateConnectionsService.stateName].enableUpdateConnections
  );
  public disableSearchAndSort$: Observable<boolean> = this.store.select(
    (state) => state[this.recordsService.stateName].disableSearchAndSort
  );
  public filter$: Observable<any> = this.store.select(
    (state) => state[this.recordsService.stateName].filter
  );
  public fixedColumns$: Observable<boolean> = this.store.select(
    (state) => state.recordList.fixedColumns
  );

  public searchLabel: string;
  public searchQuery: string;
  public isRevalAdmin: boolean;
  public isConnectionsSummary: boolean;
  public form: UntypedFormGroup;
  public subscriptions: Subscription = new Subscription();
  showTableFilters: boolean;
  filterPanelOpen: boolean = false;
  showClearSearchForm: boolean = false;
  fixedColumns: boolean;
  @ViewChild("ngForm") public ngForm;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private store: Store,
    private recordsService: RecordsService,
    private updateConnectionsService: UpdateConnectionsService,
    private authService: AuthService
  ) {
    this.isConnectionsSummary =
      this.recordsService.stateName === stateName.CONNECTIONS;
    this.isRevalAdmin = this.authService.isRevalAdmin;
    this.searchLabel = "Search name or GMC no";
  }

  ngOnInit() {
    this.setupForm();
    this.listenToClearAllEvent();
    this.listenToAllocateAdminsEvent();
    this.showTableFilters = this.recordsService.showTableFilters;
    this.subscriptions.add(
      this.recordsService.toggleTableFilterPanel$.subscribe(
        (isOpen: boolean) => {
          this.filterPanelOpen = isOpen;
        }
      )
    );

    this.subscriptions.add(
      this.fixedColumns$.subscribe((isFixedColumns: boolean) => {
        this.fixedColumns = isFixedColumns;
      })
    );

    this.subscriptions.add(
      this.searchQuery$.subscribe((searchQuery) => {
        this.searchQuery = searchQuery;
        searchQuery && this.form.get("searchQuery").setValue(searchQuery);
        this.toggleResetFormButton();
      })
    );
  }
  public toggleFixedColumns() {
    this.store.dispatch(new ToggleFixedColumns(!this.fixedColumns));
  }

  public setupForm(): void {
    this.form = this.formBuilder.group(
      {
        searchQuery: this.searchQuery || null
      },
      { updateOn: "change" }
    );

    this.subscriptions.add(
      this.form.get("searchQuery").valueChanges.subscribe((val) => {
        this.toggleResetFormButton(val);
      })
    );
  }

  toggleResetFormButton(inputValue: string = "") {
    if (inputValue || this.searchQuery) {
      this.showClearSearchForm = true;
    } else {
      this.showClearSearchForm = false;
    }
  }

  /**
   * Subscribe to resetSearchForm$ event triggered by clear all filters btn
   * And then reset form
   *
   * angular material forms error state is bound to FormGroupDirective / NgForm
   * so therefore form must be reset by resetForm() instead of FormGroup's reset()
   * https://github.com/angular/components/issues/4190
   */
  public listenToClearAllEvent(): void {
    this.subscriptions.add(
      this.recordsService.resetSearchForm$
        .pipe(filter(Boolean))
        .subscribe(() => {
          this.ngForm?.resetForm();
        })
    );
  }

  public listenToAllocateAdminsEvent(): void {
    this.subscriptions.add(
      this.enableAllocateAdmin$
        .pipe(filter((value) => value !== undefined))
        .subscribe((enableAllocateAdmin: boolean) => {
          if (enableAllocateAdmin) {
            this.form.disable();
          } else {
            this.form.enable();
          }
        })
    );

    this.subscriptions.add(
      this.enableUpdateConnections$
        .pipe(filter((value) => value !== undefined))
        .subscribe((enableUpdateConnections: boolean) => {
          if (enableUpdateConnections) {
            this.form.disable();
          } else {
            this.form.enable();
          }
        })
    );

    this.subscriptions.add(
      this.disableSearchAndSort$
        .pipe(filter((value) => value !== undefined))
        .subscribe((disableSearchAndSort: boolean) => {
          if (disableSearchAndSort) {
            this.form.disable();
          } else {
            this.form.enable();
          }
        })
    );
  }

  /**
   * If form is valid then trim leading and trailing whitespaces from query
   * So that search cannot be invoked with just blank spaces
   */
  public checkForm(): void {
    const searchQuery = this.form.value.searchQuery;

    if (searchQuery && searchQuery.length && this.form.valid) {
      this.submitForm(searchQuery.trim());
    }
  }

  public submitForm(searchQuery: string): void {
    this.recordsService.search(searchQuery);
    this.recordsService.resetSort();
    this.recordsService
      .resetPaginator()
      .pipe(take(1))
      .subscribe(() => this.recordsService.updateRoute());
  }

  toggleTableFilterPanel() {
    this.recordsService.toggleTableFilterPanel$.next(!this.filterPanelOpen);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
