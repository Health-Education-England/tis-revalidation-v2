import { async, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent, MockComponent, routes } from "../mock.test.component";
import { AnalyticsConfig, AnalyticsModule } from "./analytics.module";

describe("MockComponent", () => {
  let router: Router;
  let fixture: any;
  let docHead: HTMLHeadElement;
  let scriptTag: HTMLScriptElement;
  let asyncTag: boolean;

  const setVariables = () => {
    docHead = fixture.debugElement.nativeNode.ownerDocument.head;
    scriptTag = docHead.querySelector(
      'script[src^="https://www.google-analytics.com/analytics.js"]'
    );
    asyncTag = scriptTag ? scriptTag.hasAttribute("async") : false;
  };

  const resetVariables = () => {
    router = fixture = docHead = scriptTag = asyncTag = null;
  };

  describe("Analytics Module loader tests", () => {
    const analyticsConfig: AnalyticsConfig = {
      siteId: ["TEST"],
      enabled: true
    };

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

      fixture.detectChanges();
      docHead = scriptTag = asyncTag = null;
    }));

    beforeEach(() => {
      setVariables();
    });

    it("should create the mock component", () => {
      const app = fixture.componentInstance;
      expect(app).toBeTruthy();
    });

    it("header tag should contain the script tag", () => {
      expect(scriptTag).toBeTruthy();
    });

    it("script tag should contain the async attribute", () => {
      expect(asyncTag).toBeTrue();
    });
  });

  describe("Alter module configuration", () => {
    const newAnalyticsConfig: AnalyticsConfig = {
      siteId: ["TEST"],
      enabled: false
    };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes(routes),
          AnalyticsModule.forRoot(newAnalyticsConfig)
        ],
        declarations: [AppComponent, MockComponent]
      }).compileComponents();

      router = TestBed.inject(Router);
      fixture = TestBed.createComponent(AppComponent);

      fixture.ngZone.run(() => {
        router.initialNavigation();
      });

      fixture.detectChanges();
      docHead = scriptTag = asyncTag = null;
    }));

    beforeEach(() => {
      setVariables();
    });

    it("should create the mock component", () => {
      const app = fixture.componentInstance;
      expect(app).toBeTruthy();
    });

    it("should not initialise or add script to header", () => {
      expect(scriptTag).toBeFalsy();
    });

    it("should not initialise or add script to header", () => {
      expect(asyncTag).toBeFalsy();
    });
  });

  afterEach(() => {
    resetVariables();
  });
});
