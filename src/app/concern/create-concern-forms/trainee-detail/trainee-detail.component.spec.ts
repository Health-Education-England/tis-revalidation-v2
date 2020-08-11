import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { NgxsModule, Store } from "@ngxs/store";
import { AdminsState } from "../../../admins/state/admins.state";
import { MaterialModule } from "../../../shared/material/material.module";
import { ConcernState } from "../../state/concern.state";

import { TraineeDetailComponent } from "./trainee-detail.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AdminsModule } from "src/app/admins/admins.module";
import { SetSelectedConcern } from "../../state/concern.actions";
import { defaultConcern } from "../../constants";
import { IConcernSummary } from "../../concern.interfaces";
import { Observable } from "rxjs";
import { ConcernHistoryResponse2 } from "src/app/recommendation/mock-data/recommendation-spec-data";

describe("TraineeDetailComponent", () => {
  let component: TraineeDetailComponent;
  let fixture: ComponentFixture<TraineeDetailComponent>;
  let store: Store;
  const setSelectedConcern = (concern: IConcernSummary): Observable<any> => {
    return store.dispatch(new SetSelectedConcern(concern));
  };

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
    setSelectedConcern(defaultConcern);
  }));

  beforeEach(() => {
    spyOn(
      TraineeDetailComponent.prototype,
      "initialiseFormControls"
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

  it("should initialise form controls", () => {
    expect(component.initialiseFormControls).toHaveBeenCalled();
  });

  it("should reflect form values in add mode", () => {
    fixture.detectChanges();
    expect(component.form.grade.value).toEqual(defaultConcern.grade);
    expect(component.form.site.value).toEqual(defaultConcern.site);
    expect(component.form.employer.value).toEqual(defaultConcern.employer);
  });

  it("should reflect no form validation when source is not set to `Lead Employer Trust (LET)`", () => {
    fixture.detectChanges();
    expect(component.form.site.validator).toBeNull();
    expect(component.form.employer.validator).toBeNull();
  });

  it("should reflect form values in edit mode", async () => {
    const newConcern: IConcernSummary = ConcernHistoryResponse2.concerns[0];
    await setSelectedConcern(newConcern).toPromise();
    fixture.detectChanges();
    expect(component.form.grade.value).toEqual(newConcern.grade);
    expect(component.form.site.value).toEqual(newConcern.site);
    expect(component.form.employer.value).toEqual(newConcern.employer);
  });

  it("should reflect required fields when source is `Lead Employer Trust (LET)` ", async () => {
    const newConcern: IConcernSummary = ConcernHistoryResponse2.concerns[0];
    newConcern.source = `Lead Employer Trust (LET)`;
    await setSelectedConcern(newConcern).toPromise();
    fixture.detectChanges();
    expect(component.form.site.validator).toBeDefined();
    expect(component.form.employer.validator).toBeDefined();
  });
});
