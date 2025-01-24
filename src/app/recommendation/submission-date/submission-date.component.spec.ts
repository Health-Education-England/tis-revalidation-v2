import { ComponentFixture, TestBed } from "@angular/core/testing";
import { UtilitiesService } from "src/app/shared/services/utilities/utilities.service";
import { RecommendationHistoryState } from "../state/recommendation-history.state";
import { SubmissionDateComponent } from "./submission-date.component";
import { NgxsModule, Store } from "@ngxs/store";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { MaterialModule } from "../../shared/material/material.module";
import { IRecommendationHistory } from "../recommendation-history.interface";
import { By } from "@angular/platform-browser";

describe("SubmissionDateComponent", () => {
  let component: SubmissionDateComponent;
  let fixture: ComponentFixture<SubmissionDateComponent>;
  let store: Store;
  const mockRecommendation: IRecommendationHistory = {
    gmcNumber: 999999,
    fullName: "Bob Fossil",
    curriculumEndDate: new Date("2200-01-01"),
    programmeMembershipType: "Substantive",
    currentGrade: null,
    deferralReasons: [],
    underNotice: null,
    revalidations: [],
    designatedBody: "1-AIIDSA",
    gmcSubmissionDate: new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    )
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubmissionDateComponent],
      imports: [
        NgxsModule.forRoot([RecommendationHistoryState]),
        HttpClientTestingModule,
        RouterTestingModule,
        MaterialModule
      ],
      providers: [UtilitiesService]
    }).compileComponents();
    store = TestBed.inject(Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionDateComponent);
    component = fixture.componentInstance;
    store.reset({
      recommendationHistory: { item: mockRecommendation }
    });
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should be assigned a class 'alert-future' when submission due date is in the future", () => {
    fixture.detectChanges();
    const element: HTMLElement = fixture.debugElement.query(
      By.css("mat-card")
    ).nativeElement;
    expect(element.classList).toContain("alert-future");
  });

  it("should be assigned a class 'alert-past' when submission due date is in the past", () => {
    store.reset({
      recommendationHistory: {
        item: {
          ...mockRecommendation,
          gmcSubmissionDate: new Date("2000-01-01")
        }
      }
    });

    fixture.detectChanges();
    const element: HTMLElement = fixture.debugElement.query(
      By.css("mat-card")
    ).nativeElement;
    expect(element.classList).toContain("alert-past");
  });

  it("should be assigned a class 'alert-warning' when submission due date is imminent", () => {
    const today = new Date();
    const tomorrow = today.setDate(today.getDate() + 1);
    store.reset({
      recommendationHistory: {
        item: {
          ...mockRecommendation,
          gmcSubmissionDate: tomorrow
        }
      }
    });
    fixture.detectChanges();
    const element: HTMLElement = fixture.debugElement.query(
      By.css("mat-card")
    ).nativeElement;
    expect(element.classList).toContain("alert-warning");
  });

  it("should not display submission due date when data set to null", () => {
    store.reset({
      recommendationHistory: {
        item: {
          ...mockRecommendation,
          gmcSubmissionDate: null
        }
      }
    });
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css("mat-card"))).toBeFalsy();
  });
});
