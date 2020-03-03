import { TestBed, async } from "@angular/core/testing";
import { AnalyticsModule, AnalyticsConfig } from "./analytics.module";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { AppComponent, MockComponent, routes } from "../mock.test.component";

describe("MockComponent", () => {
  let location: Location;
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
    location = TestBed.inject(Location);

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
    let siteId: string;
    let asyncTag: boolean;

    beforeEach(() => {
      docHead = fixture.debugElement.nativeNode.ownerDocument.head;
      scriptTag = docHead.querySelector(
        'script[src^="https://www.googletagmanager.com/gtag/js"]'
      );
      siteId = scriptTag.getAttribute("src");
      asyncTag = scriptTag.hasAttribute("async");
    });

    it("header tag should contain the script tag", () => {
      expect(scriptTag).toBeTruthy();
    });

    it("script tag should contain the injected siteId", () => {
      expect(siteId).toContain(analyticsConfig.siteId.join());
    });

    it("script tag should contain the async attribute", () => {
      expect(asyncTag).toBeTrue();
    });
  });
});
