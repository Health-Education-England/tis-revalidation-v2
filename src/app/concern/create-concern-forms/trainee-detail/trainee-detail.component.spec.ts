import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { NgxsModule, Store } from "@ngxs/store";
import { AdminsModule } from "src/app/admins/admins.module";
import { ClearAllocateList } from "../../../admins/state/admins.actions";
import { AdminsState } from "../../../admins/state/admins.state";
import { ConcernHistoryResponse2 } from "../../../recommendation/mock-data/recommendation-spec-data";
import { MaterialModule } from "../../../shared/material/material.module";
import { IConcernSummary } from "../../concern.interfaces";
import { ConcernState } from "../../state/concern.state";

import { TraineeDetailComponent } from "./trainee-detail.component";

describe("TraineeDetailComponent", () => {
  let component: TraineeDetailComponent;
  let fixture: ComponentFixture<TraineeDetailComponent>;
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TraineeDetailComponent],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        AdminsModule,
        NgxsModule.forRoot([ConcernState, AdminsState])
      ]
    }).compileComponents();
    store = TestBed.inject(Store);
  }));

  beforeEach(() => {
    spyOn(
      TraineeDetailComponent.prototype,
      "updateFormControls"
    ).and.callThrough();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should update form controls", () => {
    expect(component.updateFormControls).toHaveBeenCalled();
  });

  it("should reflect form values in add mode", () => {
    expect(component.form.grade.value).toBeNull();
    expect(component.form.site.value).toBeNull();
    expect(component.form.employer.value).toBeNull();
  });

  it("should reflect no form validation when source is not set to `Lead Employer Trust (LET)`", () => {
    expect(component.form.site.validator).toBeNull();
    expect(component.form.employer.validator).toBeNull();
  });

  it("should reflect form values in edit mode", async () => {
    const mockConcern: IConcernSummary = ConcernHistoryResponse2.concerns[0];
    store.reset({ concern: { selected: mockConcern } });
    expect(component.form.grade.value).toEqual(mockConcern.grade);
    expect(component.form.site.value).toEqual(mockConcern.site);
    expect(component.form.employer.value).toEqual(mockConcern.employer);
  });

  it("should reflect required fields when source is `Lead Employer Trust (LET)` ", async () => {
    const mockConcern: IConcernSummary = ConcernHistoryResponse2.concerns[0];
    mockConcern.source.label = `Lead Employer Trust (LET)`;
    store.reset({ concern: { selected: mockConcern } });
    expect(component.form.site.validator).toBeDefined();
    expect(component.form.employer.validator).toBeDefined();
  });

  it("should dispatch `ClearAllocateList` onDestroy lifecycle", () => {
    spyOn(store, "dispatch");
    component.ngOnDestroy();
    expect(store.dispatch).toHaveBeenCalledWith(new ClearAllocateList());
  });
});
