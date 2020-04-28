import { async, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent, MockComponent, routes } from "../mock.test.component";
import { AnalyticsConfig, AnalyticsModule } from "./analytics.module";

describe("MockComponent", () => {
  let router: Router;
  let fixture: any;
  const analyticsConfig: AnalyticsConfig = { siteId: ["TEST"], enabled: true };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        AnalyticsModule.forRoot(analyticsConfig)
      ],
      declarations: [AppComponent, MockComponent]
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(AppComponent);

    fixture.ngZone.run(() => {
      router.initialNavigation();
    });
  }));

  it("should create the mock component", () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  describe("Analytics Module loader tests", () => {
    let docHead: HTMLHeadElement;
    let scriptTag: HTMLScriptElement;
    let asyncTag: boolean;

    beforeEach(() => {
      docHead = fixture.debugElement.nativeNode.ownerDocument.head;
      scriptTag = docHead.querySelector(
        'script[src^="https://www.google-analytics.com/analytics.js"]'
      );
      asyncTag = scriptTag.hasAttribute("async");
    });

    it("header tag should contain the script tag", () => {
      expect(scriptTag).toBeTruthy();
    });

    it("script tag should contain the async attribute", () => {
      expect(asyncTag).toBeTrue();
    });
  });
});
