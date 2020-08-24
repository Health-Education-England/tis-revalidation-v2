import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent, MockComponent, routes } from "../mock.test.component";
import {
  AnalyticsConfig,
  AnalyticsModule,
  GoogleURI
} from "./analytics.module";

describe("Analytics", () => {
  let router: Router;
  let fixture: any;
  let module: AnalyticsModule;
  let config: AnalyticsConfig = { siteId: ["TEST"], enabled: true };
  let scriptTag: HTMLScriptElement;
  let scriptSrc: string;
  let asyncTag: boolean;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        AnalyticsModule.forRoot(config)
      ],
      declarations: [AppComponent, MockComponent]
    })
      .compileComponents()
      .then(() => {
        module = TestBed.inject(AnalyticsModule);
        router = TestBed.inject(Router);
        fixture = TestBed.createComponent(AppComponent);

        fixture.ngZone.run(() => {
          router.initialNavigation();
        });

        fixture.detectChanges();

        scriptTag = module.googleScript;
        scriptSrc = scriptTag ? scriptTag.getAttribute("src") : null;
        asyncTag = scriptTag ? scriptTag.hasAttribute("async") : false;
      });
  });

  describe("Enabled configuration", () => {
    beforeAll(() => {
      config.enabled = true;
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

    it("script src should be the google URI", () => {
      expect(scriptSrc).toEqual(GoogleURI);
    });
  });

  describe("Disabled configuration", () => {
    beforeAll(() => {
      config.enabled = false;
    });

    it("should create the disabled module mock component", () => {
      const app = fixture.componentInstance;
      expect(app).toBeTruthy();
    });

    it("header tag should NOT contain the script tag", () => {
      expect(scriptTag).toBeNull();
    });

    it("script tag should NOT contain the injected hotJarId", () => {
      expect(scriptSrc).toBeNull();
    });

    it("script tag should NOT contain the async attribute ", () => {
      expect(asyncTag).toBeFalse();
    });
  });

  describe("No configuration", () => {
    let doc: Document;

    beforeAll(() => {
      config.enabled = true;
    });

    beforeEach(() => {
      doc = fixture.debugElement.nativeNode.ownerDocument;
    });

    it("should remove to script tag", () => {
      spyOn(HTMLScriptElement.prototype, "remove").and.callThrough();
      module.initilialise();
      expect(HTMLScriptElement.prototype.remove).toHaveBeenCalled();
    });

    it("New instance of Module should throw error", () => {
      spyOn(AnalyticsModule.prototype, "initilialise").and.callThrough();
      expect(function () {
        new AnalyticsModule(null, null, null, doc);
      }).toThrowError(
        `AnalyticsModule requires forRoot({ siteId: [string array of site id's], enabled: true|false })`
      );
      expect(AnalyticsModule.prototype.initilialise).toHaveBeenCalled();
    });

    it("New instance with multiple Modules should throw error", () => {
      spyOn(AnalyticsModule.prototype, "initilialise").and.callThrough();
      expect(function () {
        new AnalyticsModule(null, module, config, doc);
      }).toThrowError(
        `AnalyticsModule is already loaded. Import it in the AppModule only`
      );
    });
  });
});
