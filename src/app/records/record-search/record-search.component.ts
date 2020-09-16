import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";
import { filter, take } from "rxjs/operators";
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

  public form: FormGroup;
  public subscriptions: Subscription = new Subscription();
  @ViewChild("ngForm") public ngForm;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    private recordsService: RecordsService
  ) {}

  ngOnInit() {
    this.setupForm();
    this.listenToClearAllEvent();
    this.listenToAllocateAdminsEvent();
  }

  public setupForm(): void {
    this.form = this.formBuilder.group(
      {
        searchQuery: [null, [Validators.required]]
      },
      { updateOn: "submit" }
    );
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
        .subscribe(() => this.ngForm.resetForm())
    );
  }

  public listenToAllocateAdminsEvent(): void {
    this.subscriptions.add(
      this.enableAllocateAdmin$
        .pipe(filter((value) => value !== undefined))
        .subscribe((enableAllocateAdmin: boolean) => {
          if (enableAllocateAdmin === true) {
            this.form.disable();
          } else if (enableAllocateAdmin === false) {
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
    this.submitForm(this.form.value.searchQuery.trim());
  }

  public submitForm(searchQuery: string): void {
    if (searchQuery && searchQuery.length) {
      this.recordsService.search(searchQuery);
    } else {
      this.recordsService.clearSearch();
    }

    this.recordsService.resetSort();
    this.recordsService
      .resetPaginator()
      .pipe(take(1))
      .subscribe(() => this.recordsService.updateRoute());
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
