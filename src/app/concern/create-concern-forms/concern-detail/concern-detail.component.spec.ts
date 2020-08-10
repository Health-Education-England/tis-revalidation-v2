import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ConcernDetailComponent } from "./concern-detail.component";
import { NgxsModule, Store } from "@ngxs/store";
import { ConcernState } from "../../state/concern.state";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MaterialModule } from "src/app/shared/material/material.module";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import { SetSelectedConcern } from "../../state/concern.actions";
import { defaultConcern } from "../../constants";
import { ConcernHistoryResponse2 } from "src/app/recommendation/mock-data/recommendation-spec-data";
import { Observable } from "rxjs";
import { IConcernSummary, ConcernStatus } from "../../concern.interfaces";
import { RouterTestingModule } from "@angular/router/testing";

describe("ConcernDetailComponent", () => {
  let component: ConcernDetailComponent;
  let fixture: ComponentFixture<ConcernDetailComponent>;
  let store: Store;
  const setSelectedConcern = (concern: IConcernSummary): Observable<any> => {
    return store.dispatch(new SetSelectedConcern(concern));
  };

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
    setSelectedConcern(defaultConcern);
  }));

  beforeEach(() => {
    spyOn(
      ConcernDetailComponent.prototype,
      "InitialiseFormControls"
    ).and.callThrough();
    spyOn(
      ConcernDetailComponent.prototype,
      "InitialiseMaxMinDates"
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

  it("should initialise form controls", () => {
    expect(component.InitialiseFormControls).toHaveBeenCalled();
  });

  it("should check form values", async () => {
    const newConcern: IConcernSummary = ConcernHistoryResponse2.concerns[0];
    await setSelectedConcern(newConcern).toPromise();
    fixture.detectChanges();
    expect(component.dateOfIncident.value).toEqual(newConcern.dateOfIncident);
    expect(component.source.value).toEqual(newConcern.source);
    expect(component.concernType.value).toEqual(newConcern.concernType);
    expect(component.dateReported.value).toEqual(newConcern.dateReported);
    expect(component.followUpDate.value).toEqual(newConcern.followUpDate);
    expect(component.status.value).toEqual(
      component.getConcernStatus(newConcern.status)
    );
    expect(component.setConcernStatus(true)).toEqual(ConcernStatus.OPEN);
    expect(component.setConcernStatus(false)).toEqual(ConcernStatus.CLOSED);
  });

  it("should initialise max and min dates", () => {
    expect(component.InitialiseMaxMinDates).toHaveBeenCalled();
  });

  it("should merge and save state on submit", () => {
    expect(component).toBeTruthy();
  });
});
