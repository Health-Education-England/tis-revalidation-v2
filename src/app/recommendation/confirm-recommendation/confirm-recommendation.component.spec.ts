import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { MaterialModule } from "../../shared/material/material.module";
import { RecommendationHistoryState } from "../state/recommendation-history.state";
import { RecommendationHistoryService } from "../services/recommendation-history.service";
import { ConfirmRecommendationComponent } from "./confirm-recommendation.component";
import { HarnessLoader } from "@angular/cdk/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { MatButtonHarness } from "@angular/material/button/testing";
import { MatSlideToggleHarness } from "@angular/material/slide-toggle/testing";
describe("ConfirmRecommendationComponent", () => {
  let store: Store;
  let recommendationHistoryService: RecommendationHistoryService;
  let component: ConfirmRecommendationComponent;
  let fixture: ComponentFixture<ConfirmRecommendationComponent>;
  let loader: HarnessLoader;
  const toggleConfirmSelector = { selector: "[data-jasmine='toggleConfirm']" };
  const submitButtonSelector = { selector: "[data-jasmine='buttonSubmit']" };
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmRecommendationComponent],
      imports: [
        MaterialModule,
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        NgxsModule.forRoot([RecommendationHistoryState])
      ]
    }).compileComponents();
    store = TestBed.inject(Store);
    recommendationHistoryService = TestBed.inject(RecommendationHistoryService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmRecommendationComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;

    store.reset({
      recommendationHistory: {
        item: {
          revalidations: [
            {
              gmcNumber: "123456789",
              recommendationId: "abcdefghijklmnopqrstuvwxyz",
              gmcOutcome: null,
              recommendationType: "REVALIDATE",
              gmcSubmissionDate: "2022-10-31",
              actualSubmissionDate: null,
              gmcRevalidationId: null,
              recommendationStatus: "READY_TO_REVIEW",
              deferralDate: null,
              deferralReason: null,
              deferralSubReason: null,
              deferralComment: null,
              comments: [],
              admin: ""
            }
          ]
        }
      }
    });
    fixture.detectChanges();
  });

  fit("should create", () => {
    expect(component).toBeTruthy();
  });

  fit("should disable form submission by default", async () => {
    const buttonSubmitElement = await loader.getHarness(
      MatButtonHarness.with(submitButtonSelector)
    );
    expect(await buttonSubmitElement.isDisabled()).toBe(true);
  });

  fit("should enable and disable form submit when toggling confirm", async () => {
    const toggleConfirmElement = await loader.getHarness(
      MatSlideToggleHarness.with(toggleConfirmSelector)
    );
    const buttonSubmitElement = await loader.getHarness(
      MatButtonHarness.with(submitButtonSelector)
    );

    await toggleConfirmElement.check();

    expect(await buttonSubmitElement.isDisabled()).toBe(false);
    await toggleConfirmElement.uncheck();
    expect(await buttonSubmitElement.isDisabled()).toBe(true);
  });
  fit("should disable form when submit button clicked", async () => {
    spyOn(recommendationHistoryService, "submitRecommendationToGMC");
    const toggleConfirmElement = await loader.getHarness(
      MatSlideToggleHarness.with(toggleConfirmSelector)
    );
    const buttonSubmitElement = await loader.getHarness(
      MatButtonHarness.with(submitButtonSelector)
    );

    await toggleConfirmElement.check();
    await buttonSubmitElement.click();

    fixture.detectChanges();
    expect(await buttonSubmitElement.isDisabled()).toBe(true);
    expect(await buttonSubmitElement.getText()).toBe("Submitting...");
  });
});
