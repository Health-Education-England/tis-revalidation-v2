import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { DetailsSideNavComponent } from "./details-side-nav.component";
import { NgxsModule } from "@ngxs/store";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "src/app/shared/material/material.module";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DetailsSideNavState } from "./state/details-side-nav.state";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RecommendationHistoryRespone2 } from "src/app/recommendation/mock-data/recommendation-spec-data";
import { DetailsSideNavService } from "./service/details-side-nav.service";
import { of } from "rxjs";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";

describe("DetailsSideNavComponent", () => {
  let component: DetailsSideNavComponent;
  let fixture: ComponentFixture<DetailsSideNavComponent>;
  // TODO: uncomment to add data to tests rendering component when service is split
  // let httpClient: HttpClient;
  // let store: Store;
  let service: DetailsSideNavService;
  const activatedRoute = {
    snapshot: { params: { gmcNumber: 0 } }
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MaterialModule,
        NgxsModule.forRoot([DetailsSideNavState]),
        HttpClientTestingModule,
        RouterTestingModule,
        CommonModule
      ],
      declarations: [DetailsSideNavComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        DetailsSideNavService,
        {
          provide: ActivatedRoute,
          useValue: activatedRoute
        }
      ]
    }).compileComponents();
    // TODO: uncomment to add data to tests rendering component when service is split
    // store = TestBed.inject(Store);
    // httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(DetailsSideNavService);
    spyOn(service, "getDetails").and.returnValue(
      of(RecommendationHistoryRespone2)
    );
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
