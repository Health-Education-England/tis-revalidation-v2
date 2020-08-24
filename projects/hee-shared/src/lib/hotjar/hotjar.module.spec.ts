import { TestBed, async } from "@angular/core/testing";
import { HotJarModule, HotJarConfig } from "./hotjar.module";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { AppComponent, MockComponent, routes } from "../mock.test.component";

describe("HotJar", () => {
  let router: Router;
  let fixture: any;
  let module: HotJarModule;
  let config: HotJarConfig = {
    hotJarId: 1,
    hotJarSv: 2,
    enabled: true
  };

  let scriptTag: HTMLScriptElement;
  let scriptSrc: string;
  let asyncTag: boolean;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HotJarModule.forRoot(config)
      ],
      declarations: [AppComponent, MockComponent]
    })
      .compileComponents()
      .then(() => {
        module = TestBed.inject(HotJarModule);
        router = TestBed.inject(Router);
        fixture = TestBed.createComponent(AppComponent);

        fixture.ngZone.run(() => {
          router.initialNavigation();
        });

        fixture.detectChanges();

        scriptTag = module.hotJarScript;
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

    it("script tag should contain the injected hotJarId", () => {
      expect(scriptSrc).toContain(`hotjar-${config.hotJarId}.js`);
    });

    it("script tag should contain the injected hotJarVersion", () => {
      expect(scriptSrc).toContain(`?sv=${config.hotJarSv}`);
    });

    it("script tag should contain the async attribute ", () => {
      expect(asyncTag).toBeTrue();
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
      module.InitializeHotJar();
      expect(HTMLScriptElement.prototype.remove).toHaveBeenCalled();
    });

    it("New instance of Module should throw error", () => {
      spyOn(HotJarModule.prototype, "InitializeHotJar").and.callThrough();
      expect(function () {
        new HotJarModule(null, null, doc);
      }).toThrowError(
        `HotJarModule requires forRoot({ hotJarId: 'hotJar client id', hotJarSv: 'version number of hotJar js to use' })`
      );
      expect(HotJarModule.prototype.InitializeHotJar).toHaveBeenCalled();
    });

    it("New instance with multiple Modules should throw error", () => {
      spyOn(HotJarModule.prototype, "InitializeHotJar").and.callThrough();
      expect(function () {
        new HotJarModule(module, config, doc);
      }).toThrowError(
        `HotJarModule is already loaded. Import it in the AppModule only`
      );
    });
  });
});
