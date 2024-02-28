import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { RecommendationModule } from "../recommendation.module";
import { CreateRecommendationComponent } from "./create-recommendation.component";
import { MaterialModule } from "../../shared/material/material.module";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { RecommendationHistoryState } from "../state/recommendation-history.state";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ActivatedRoute } from "@angular/router";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../../core/auth/auth.service";
import { DetailsModule } from "../../details/details.module";
import { By } from "@angular/platform-browser";
import { IRecommendationHistory } from "../recommendation-history.interface";

describe("CreateRecommendationComponent", () => {
  let component: CreateRecommendationComponent;
  let fixture: ComponentFixture<CreateRecommendationComponent>;
  let store: Store;
  let auth: AuthService;
  const activatedRoute = {
    parent: { snapshot: { params: { gmcNumber: 0 } } }
  };

  const mockRecommendation: IRecommendationHistory = {
    gmcNumber: 999999,
    fullName: "Bob Fossil",
    curriculumEndDate: new Date("2200-01-01"),
    programmeMembershipType: "Substantive",
    currentGrade: "",
    deferralReasons: [],
    underNotice: "",
    revalidations: [],
    designatedBody: "1-AIIDSA",
    gmcSubmissionDate: new Date("2222-12-21")
  };
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        DetailsModule,
        RecommendationModule,
        NgxsModule.forRoot([RecommendationHistoryState])
      ],
      providers: [
        AuthService,
        {
          provide: ActivatedRoute,
          useValue: activatedRoute
        }
      ],
      declarations: [CreateRecommendationComponent]
    }).compileComponents();
    store = TestBed.inject(Store);
    auth = TestBed.inject(AuthService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRecommendationComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  // Current day is excluded when calculating 120 days. Therefore, if today was the 12 July 2022 the cutoff date
  // for the revalidation date would be 9th November 2022 (this would be allowed but the 10th November 2022 would
  // not be allowed)
  // Using the calculations today + 120 = OK; today + 121 not OK

  it("should display warning that deferral is not possible when submission due date is > 4 months", () => {
    const d = new Date();
    d.setDate(d.getDate() + 121);
    store.reset({
      recommendationHistory: {
        item: {
          ...mockRecommendation,
          gmcSubmissionDate: d
        }
      }
    });
    fixture.detectChanges();

    expect(
      fixture.debugElement.queryAll(By.css(".deferral-blocked-message")).length
    ).toBe(1);
  });

  it("should NOT display warning that deferral is not possible when submission due date is < 4 months", () => {
    const d = new Date();
    d.setDate(d.getDate() + 120);
    store.reset({
      recommendationHistory: {
        item: {
          ...mockRecommendation,
          gmcSubmissionDate: d
        }
      }
    });
    fixture.detectChanges();
    expect(
      fixture.debugElement.queryAll(By.css(".deferral-blocked-message")).length
    ).toBe(0);
  });

  it("should display Make Recommendation button when admin is approver", () => {
    auth.isRevalApprover = true;
    component.ngOnInit();
    fixture.detectChanges();
    const makeRecommendationButton = fixture.debugElement.query(
      By.css("[data-cy = 'btnMakeRecommendation']")
    ).nativeElement;
    expect(makeRecommendationButton).toBeTruthy();
  });

  it("should display the Save draft button as active by default", () => {
    expect(
      fixture.debugElement.query(By.css("[data-cy = 'btnSaveDraft']"))
        .nativeElement.disabled
    ).toBeFalsy();
  });

  it("should display the Save draft and Make Recommendation buttons as disabled on click", () => {
    spyOn(component, "saveDraft").and.callFake(() => {
      component.isSaving = true;
    });
    auth.isRevalApprover = true;
    component.ngOnInit();
    fixture.detectChanges();

    const saveButton = fixture.debugElement.query(
      By.css("[data-cy = 'btnSaveDraft']")
    ).nativeElement;

    const makeRecommendationButton = fixture.debugElement.query(
      By.css("[data-cy = 'btnMakeRecommendation']")
    ).nativeElement;

    const matSelect = fixture.debugElement.query(
      By.css("[data-cy='selectRecommendation']")
    ).nativeElement;
    matSelect.click();
    fixture.detectChanges();

    const matOption = fixture.debugElement.queryAll(
      By.css(".mat-mdc-option")
    )[2].nativeElement;

    matOption.click();

    fixture.detectChanges();

    saveButton.click();

    fixture.detectChanges();
    expect(component.saveDraft).toHaveBeenCalledWith(false);
    expect(saveButton.disabled).toBeTruthy();
    expect(makeRecommendationButton.disabled).toBeTruthy();
  });
});
