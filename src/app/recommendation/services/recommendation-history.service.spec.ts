import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { environment } from "@environment";
import {
  IRecommendationSummary,
  RecommendationGmcOutcome,
  RecommendationStatus
} from "../recommendation-history.interface";

import { RecommendationHistoryService } from "./recommendation-history.service";

describe("RecommendationHistoryService", () => {
  let service: RecommendationHistoryService;
  let http: HttpTestingController;
  let router: Router;
  const mockRecommendationSummary: IRecommendationSummary = {
    actualSubmissionDate: new Date(),
    admin: "",
    comments: [],
    deferralComment: "",
    deferralDate: new Date(),
    deferralReason: 1231,
    deferralSubReason: 23,
    gmcNumber: 343242342,
    gmcOutcome: RecommendationGmcOutcome.APPROVED,
    gmcRevalidationId: "",
    gmcSubmissionDate: new Date(),
    recommendationId: "",
    recommendationStatus: RecommendationStatus.NOT_STARTED,
    recommendationType: ""
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.inject(RecommendationHistoryService);
    http = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should call get recommendation history api", () => {
    const endPoint = `${environment.appUrls.getRecommendation}/${mockRecommendationSummary.gmcNumber}`;
    service
      .getRecommendationHistory(mockRecommendationSummary.gmcNumber)
      .subscribe();

    const mockHttp = http.expectOne(endPoint);
    expect(mockHttp.request.method).toBe("GET");

    http.verify();
  });

  it("should call save recommendation api", () => {
    mockRecommendationSummary.recommendationId = "1232323";
    const endPoint: string = environment.appUrls.saveRecommendation;
    service.saveRecommendation(mockRecommendationSummary).subscribe();

    const mockHttp = http.expectOne(endPoint);
    expect(mockHttp.request.method).toBe("PUT");

    http.verify();
  });

  it("should call submit recommendation to GMC api", (done: DoneFn) => {
    service.submitRecommendationToGMC(null, "").subscribe({
      error: (err) => {
        expect(err).toEqual("gmcNumber and recommendationId are required");
        done();
      }
    });
  });

  it("should call submit recommendation to GMC api", () => {
    mockRecommendationSummary.recommendationId = "1232323";
    const endPoint = `${environment.appUrls.submitToGMC}/${mockRecommendationSummary.gmcNumber}/submit/${mockRecommendationSummary.recommendationId}`;
    service
      .submitRecommendationToGMC(
        mockRecommendationSummary.gmcNumber,
        mockRecommendationSummary.recommendationId
      )
      .subscribe();

    const mockHttp = http.expectOne(endPoint);
    expect(mockHttp.request.method).toBe("POST");

    http.verify();
  });

  it("should navigate to parent state", () => {
    spyOn(router, "navigate");
    const state: RouterStateSnapshot = {
      url: "/recommendation/8263000/create",
      root: new ActivatedRouteSnapshot()
    };
    service.navigateToParentState(state);
    expect(router.navigate).toHaveBeenCalledWith(["/recommendation/8263000"]);
  });
});
