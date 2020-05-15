import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { of } from "rxjs";
import { TraineeService } from "../../core/trainee/trainee.service";
import { MaterialModule } from "../../shared/material/material.module";
import {
  Get,
  ResetPaginator,
  ResetSort,
  Search
} from "../state/trainees.actions";
import { TraineesState } from "../state/trainees.state";

import { TraineeSearchComponent } from "./trainee-search.component";

describe("TraineeSearchComponent", () => {
  let store: Store;
  let component: TraineeSearchComponent;
  let fixture: ComponentFixture<TraineeSearchComponent>;
  let traineeService: TraineeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TraineeSearchComponent],
      imports: [
        MaterialModule,
        NgxsModule.forRoot([TraineesState]),
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    store = TestBed.inject(Store);
    traineeService = TestBed.inject(TraineeService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeSearchComponent);
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

    traineeService.resetSearchForm$.next(true);
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
    spyOn(store, "dispatch").and.returnValue(of({}));
    spyOn(traineeService, "updateTraineesRoute");

    component.params = {
      searchQuery: "87723113"
    };
    component.setupForm();
    component.submitForm(component.params.searchQuery);

    expect(store.dispatch).toHaveBeenCalledTimes(4);
    expect(store.dispatch).toHaveBeenCalledWith(
      new Search(component.params.searchQuery)
    );
    expect(store.dispatch).toHaveBeenCalledWith(new ResetSort());
    expect(store.dispatch).toHaveBeenCalledWith(new ResetPaginator());
    expect(store.dispatch).toHaveBeenCalledWith(new Get());
    expect(traineeService.updateTraineesRoute).toHaveBeenCalled();
  });

  it("should unsubscribe from subscriptions upon `ngOnDestroy()`", () => {
    spyOn(component.subscriptions, "unsubscribe");
    component.ngOnDestroy();
    expect(component.subscriptions.unsubscribe).toHaveBeenCalled();
  });
});
