import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { of } from "rxjs";
import { TraineeService } from "../../core/trainee/trainee.service";
import { MaterialModule } from "../../shared/material/material.module";
import { GetTrainees, SearchTrainees } from "../state/trainees.actions";
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
      ]
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

  it("should invoke setupForm on `ngOnInit()`", () => {
    spyOn(component, "setupForm");
    component.ngOnInit();
    expect(component.setupForm).toHaveBeenCalled();
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

    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith(
      new SearchTrainees(component.params.searchQuery)
    );
    expect(store.dispatch).toHaveBeenCalledWith(new GetTrainees());
    expect(traineeService.updateTraineesRoute).toHaveBeenCalled();
  });
});
