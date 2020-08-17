import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { ConcernHistoryResponse2 } from "src/app/recommendation/mock-data/recommendation-spec-data";
import { MaterialModule } from "src/app/shared/material/material.module";
import { ConcernStatus, IConcernSummary } from "../../concern.interfaces";
import { ConcernState } from "../../state/concern.state";

import { ConcernDetailComponent } from "./concern-detail.component";

describe("ConcernDetailComponent", () => {
  let component: ConcernDetailComponent;
  let fixture: ComponentFixture<ConcernDetailComponent>;
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConcernDetailComponent],
      imports: [
        NgxsModule.forRoot([ConcernState]),
        HttpClientTestingModule,
        MaterialModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ]
    }).compileComponents();
    store = TestBed.inject(Store);
  }));

  beforeEach(() => {
    spyOn(
      ConcernDetailComponent.prototype,
      "updateFormControls"
    ).and.callThrough();
    spyOn(
      ConcernDetailComponent.prototype,
      "initialiseMaxMinDates"
    ).and.callThrough();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcernDetailComponent);
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
    expect(component.form.dateOfIncident.value).toBeNull();
    expect(component.form.source.value).toBeNull();
    expect(component.form.concernType.value).toBeNull();
    expect(component.form.dateReported.value).toBeNull();
    expect(component.form.followUpDate.value).toBeNull();
    expect(component.form.status.value).toBeNull();
    expect(component.setConcernStatus(true)).toEqual(ConcernStatus.OPEN);
    expect(component.setConcernStatus(false)).toEqual(ConcernStatus.CLOSED);
  });

  it("should reflect form values in edit mode", async () => {
    const mockConcern: IConcernSummary = ConcernHistoryResponse2.concerns[0];
    store.reset({ concern: { selected: mockConcern } });

    expect(component.form.dateOfIncident.value).toEqual(
      mockConcern.dateOfIncident
    );
    expect(component.form.source.value).toEqual(mockConcern.source);
    expect(component.form.concernType.value).toEqual(mockConcern.concernType);
    expect(component.form.dateReported.value).toEqual(mockConcern.dateReported);
    expect(component.form.followUpDate.value).toEqual(mockConcern.followUpDate);
    expect(component.form.status.value).toEqual(
      component.getConcernStatus(mockConcern.status)
    );
    expect(component.setConcernStatus(true)).toEqual(ConcernStatus.OPEN);
    expect(component.setConcernStatus(false)).toEqual(ConcernStatus.CLOSED);
  });

  it("should initialise max and min dates", () => {
    expect(component.initialiseMaxMinDates).toHaveBeenCalled();
  });

  it("should merge and save state on submit", () => {
    expect(component).toBeTruthy();
  });
});
