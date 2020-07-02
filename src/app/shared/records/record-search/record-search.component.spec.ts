import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { MaterialModule } from "../../material/material.module";
import { RecordsService } from "../services/records.service";
import {
  ClearSearch,
  EnableAllocateAdmin,
  Filter,
  Get,
  Paginate,
  ResetFilter,
  ResetPaginator,
  ResetSort,
  Search,
  Sort
} from "../../../recommendations/state/recommendations.actions";
import { RecommendationsState } from "../../../recommendations/state/recommendations.state";
import { RecordSearchComponent } from "./record-search.component";

describe("RecordSearchComponent", () => {
  let store: Store;
  let component: RecordSearchComponent;
  let fixture: ComponentFixture<RecordSearchComponent>;
  let recordsService: RecordsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecordSearchComponent],
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
    fixture = TestBed.createComponent(RecordSearchComponent);
    component = fixture.componentInstance;
    recordsService.stateName = "recommendations";
    recordsService.setActions(
      ClearSearch,
      Filter,
      Get,
      Paginate,
      ResetFilter,
      ResetPaginator,
      ResetSort,
      Search,
      Sort,
      EnableAllocateAdmin
    );
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
    spyOn(component, "listenToClearAllEvent");
    component.ngOnInit();
    expect(component.listenToClearAllEvent).toHaveBeenCalled();
  });

  it("should create form, form control with default value", () => {
    component.setupForm();
    expect(component.form.value.searchQuery).toBeNull();
  });

  it("form should be invalid if no characters entered", () => {
    component.setupForm();
    expect(component.form.invalid).toBeTruthy();
  });

  it("should invoke resetForm() upon receiving `resetSearchForm$` event", () => {
    spyOn(component.ngForm, "resetForm");

    recordsService.resetSearchForm$.next(true);
    component.listenToClearAllEvent();

    expect(component.ngForm.resetForm).toHaveBeenCalled();
  });

  it("form is only submitted if valid", () => {
    spyOn(component, "submitForm");
    component.setupForm();
    component.form.get("searchQuery").setValue("carl");
    component.checkForm();
    expect(component.submitForm).toHaveBeenCalledWith("carl");
  });

  it("should dispatch relevant actions on valid form submission", () => {
    spyOn(store, "dispatch").and.callThrough();
    spyOn(recordsService, "updateRoute");

    component.setupForm();
    component.form.get("searchQuery").setValue("87723113");
    component.submitForm("87723113");

    expect(store.dispatch).toHaveBeenCalledTimes(3);
    expect(store.dispatch).toHaveBeenCalledWith(new Search("87723113"));
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
