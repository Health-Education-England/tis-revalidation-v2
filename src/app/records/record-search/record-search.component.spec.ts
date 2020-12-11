import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { AuthService } from "src/app/core/auth/auth.service";
import { UpdateConnectionsState } from "src/app/update-connections/state/update-connections.state";
import { RecommendationsState } from "../../recommendations/state/recommendations.state";
import { MaterialModule } from "../../shared/material/material.module";
import { RecordsService } from "../services/records.service";
import { defaultRecordsState } from "../state/records.state";
import { RecordSearchComponent } from "./record-search.component";

describe("RecordSearchComponent", () => {
  let store: Store;
  let component: RecordSearchComponent;
  let fixture: ComponentFixture<RecordSearchComponent>;
  let recordsService: RecordsService;
  let authService: AuthService;
  const sortColumn = "doctorFirstName";
  const sortDirection = "asc";
  const recommendationsState = {
    ...defaultRecordsState,
    enableAllocateAdmin: true,
    disableSearchAndSort: false,
    sort: {
      active: sortColumn,
      direction: sortDirection
    }
  };

  const updateConnectionsState = {
    enableUpdateConnections: true
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecordSearchComponent],
      imports: [
        MaterialModule,
        NgxsModule.forRoot([RecommendationsState, UpdateConnectionsState]),
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    store = TestBed.inject(Store);
    recordsService = TestBed.inject(RecordsService);
    authService = TestBed.inject(AuthService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordSearchComponent);
    component = fixture.componentInstance;
    recordsService.stateName = "recommendations";
    recordsService.setRecommendationsActions();

    store.reset({
      recommendations: recommendationsState,
      updateConnections: updateConnectionsState
    });

    fixture.detectChanges();

    spyOn(component.form, "disable");
    spyOn(component.form, "enable");
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
    spyOn(recordsService, "search");
    spyOn(recordsService, "resetSort");
    spyOn(recordsService, "resetPaginator").and.callThrough();
    spyOn(recordsService, "updateRoute");

    component.setupForm();
    component.form.get("searchQuery").setValue("87723113");
    component.submitForm("87723113");

    expect(recordsService.search).toHaveBeenCalledWith("87723113");
    expect(recordsService.resetSort).toHaveBeenCalled();
    expect(recordsService.resetPaginator).toHaveBeenCalled();
    expect(recordsService.updateRoute).toHaveBeenCalled();
  });

  it("should disable the form if EnableAllocateAdmin is false", () => {
    store.reset({
      recommendations: {
        ...recommendationsState,
        enableAllocateAdmin: false
      },
      updateConnections: updateConnectionsState
    });

    component.enableAllocateAdmin$.subscribe((value) => {
      if (value) {
        expect(component.form.disable).toHaveBeenCalled();
      } else {
        expect(component.form.enable).toHaveBeenCalled();
      }
    });
  });

  it("should disable the form if DisableSearchAndSort is true", () => {
    store.reset({
      recommendations: {
        ...recommendationsState,
        disableSearchAndSort: true
      },
      updateConnections: updateConnectionsState
    });

    component.disableSearchAndSort$.subscribe((value) => {
      if (value) {
        expect(component.form.disable).toHaveBeenCalled();
      } else {
        expect(component.form.enable).toHaveBeenCalled();
      }
    });
  });

  it("should enable the form if enableUpdateConnections is false", () => {
    store.reset({
      recommendations: recommendationsState,
      updateConnections: {
        enableUpdateConnections: false
      }
    });

    component.enableUpdateConnections$.subscribe((value) => {
      if (value) {
        expect(component.form.disable).toHaveBeenCalled();
      } else {
        expect(component.form.enable).toHaveBeenCalled();
      }
    });
  });

  it("should unsubscribe from subscriptions upon `ngOnDestroy()`", () => {
    spyOn(component.subscriptions, "unsubscribe");
    component.ngOnDestroy();
    expect(component.subscriptions.unsubscribe).toHaveBeenCalled();
  });
});
