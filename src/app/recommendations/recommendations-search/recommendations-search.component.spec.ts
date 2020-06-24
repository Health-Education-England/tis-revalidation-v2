import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { MaterialModule } from "../../shared/material/material.module";
import { RecordsService } from "../../shared/records/services/records.service";
import {
  ResetPaginator,
  ResetSort,
  Search
} from "../state/recommendations.actions";
import { RecommendationsState } from "../state/recommendations.state";

import { RecommendationsSearchComponent } from "./recommendations-search.component";

describe("RecommendationsSearchComponent", () => {
  let store: Store;
  let component: RecommendationsSearchComponent;
  let fixture: ComponentFixture<RecommendationsSearchComponent>;
  let recordsService: RecordsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecommendationsSearchComponent],
      imports: [
        MaterialModule,
        NgxsModule.forRoot([RecommendationsState]),
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    store = TestBed.inject(Store);
    recordsService = TestBed.inject(RecordsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should invoke setupForm() on `ngOnInit()`", () => {
    spyOn(component, "setupForm");
    component.ngOnInit();
    expect(component.setupForm).toHaveBeenCalled();
  });

  it("should invoke setupSubscription() on `ngOnInit()`", () => {
    spyOn(component, "setupSubscription");
    component.ngOnInit();
    expect(component.setupSubscription).toHaveBeenCalled();
  });

  it("should create form, form control with value from query params", () => {
    component.params = {
      searchQuery: "john"
    };
    component.setupForm();
    expect(component.form.value.searchQuery).toEqual(
      component.params.searchQuery
    );
  });

  it("should create form, form control with default value", () => {
    component.params = {};
    component.setupForm();
    expect(component.form.value.searchQuery).toEqual("");
  });

  it("form should be invalid if no characters entered", () => {
    component.params = {
      searchQuery: ""
    };
    component.setupForm();
    expect(component.form.invalid).toBeTruthy();
  });

  it("should invoke resetForm() upon receiving `resetSearchForm$` event", () => {
    spyOn(component.ngForm, "resetForm");

    recordsService.resetSearchForm$.next(true);
    component.setupSubscription();

    expect(component.ngForm.resetForm).toHaveBeenCalled();
  });

  it("form is only submitted if valid", () => {
    spyOn(component, "submitForm");
    component.params = {
      searchQuery: "john"
    };
    component.setupForm();
    component.checkForm();
    expect(component.submitForm).toHaveBeenCalledWith(
      component.params.searchQuery
    );
  });

  it("should dispatch relevant actions on valid form submission", () => {
    spyOn(store, "dispatch").and.callThrough();
    spyOn(recordsService, "updateRoute");

    component.params = {
      searchQuery: "87723113"
    };
    component.setupForm();
    component.submitForm(component.params.searchQuery);

    expect(store.dispatch).toHaveBeenCalledTimes(3);
    expect(store.dispatch).toHaveBeenCalledWith(
      new Search(component.params.searchQuery)
    );
    expect(store.dispatch).toHaveBeenCalledWith(new ResetSort());
    expect(store.dispatch).toHaveBeenCalledWith(new ResetPaginator());
    expect(recordsService.updateRoute).toHaveBeenCalled();
  });

  it("should unsubscribe from subscriptions upon `ngOnDestroy()`", () => {
    spyOn(component.subscriptions, "unsubscribe");
    component.ngOnDestroy();
    expect(component.subscriptions.unsubscribe).toHaveBeenCalled();
  });
});
