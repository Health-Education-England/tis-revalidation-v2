import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync
} from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { MaterialModule } from "../../shared/material/material.module";
import { INavLink } from "../details.interfaces";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NavBarComponent } from "./nav-bar.component";
import { RecordsService } from "src/app/records/services/records.service";
import { NgxsModule, Store } from "@ngxs/store";
import { RecommendationsState } from "src/app/recommendations/state/recommendations.state";
import { ActivatedRoute, Router, Routes } from "@angular/router";
import { RecordsModule } from "src/app/records/records.module";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { RecordsComponent } from "src/app/records/records.component";

describe("NavBarComponent", () => {
  let store: Store;
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let service: RecordsService;
  let router: Router;
  const routes = [
    { path: "recommendations", component: RecordsComponent }
  ] as Routes;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarComponent],

      imports: [
        RecordsModule,
        RouterTestingModule.withRoutes(routes),

        MaterialModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([RecommendationsState])
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { gmcNumver: "1234567" } }
          }
        }
      ]
    }).compileComponents();
    router = TestBed.inject(Router);
    service = TestBed.inject(RecordsService);
    store = TestBed.inject(Store);
  }));

  beforeEach(() => {
    service.stateName = "recommendations";
    service.setRecommendationsActions();
    store.reset({
      queryParams: {
        active: "submissionDate",
        direction: "asc",
        pageIndex: "3",
        filter: "allDoctors",
        dbcs: "1-AIIDWI",
        gmcStatus: "",
        tisStatus: "NOT_STARTED"
      }
    });
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create component", () => {
    expect(component).toBeTruthy();
  });

  it("should create 3 navLinks", () => {
    expect(
      fixture.debugElement.queryAll(By.css("[data-jasmine='navBarLink']"))
        .length
    ).toBe(3);
  });

  it("navLinks should have the correct label", () => {
    fixture.debugElement
      .queryAll(By.css("[data-jasmine='navBarLink'] .mdc-tab__text-label"))

      .forEach((el) => {
        expect([
          "Recommendation",
          "Connection",
          "recommendations List"
        ]).toContain(el.nativeElement.innerHTML.trim());
      });
  });

  it("should open the recommendations list with query params when link is clicked", fakeAsync(() => {
    component.summaryRoute = "/recommendations";
    const params = {
      active: "submissionDate",
      direction: "asc",
      pageIndex: "3",
      filter: "allDoctors",
      dbcs: "1-AIIDWI",
      gmcStatus: "",
      tisStatus: "NOT_STARTED"
    };
    const queryParams = Object.keys(params)
      .map((key) => key + "=" + params[key])
      .join("&");
    component.queryParams$ = of(params);
    fixture.detectChanges();
    tick();
    const link = fixture.debugElement.query(
      By.css("#navLinkToList")
    ).nativeElement;
    link.click();
    fixture.detectChanges();
    tick();

    expect(router.url).toBe(`/recommendations?${queryParams}`);
  }));
});
