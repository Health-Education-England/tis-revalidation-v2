import { TestBed, async } from "@angular/core/testing";
import { HotJarModule, HotJarConfig } from "./hotjar.module";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { AppComponent, MockComponent, routes } from "../mock.test.component";

describe("MockComponent", () => {
  let router: Router;
  let fixture: any;
  let docHead: HTMLHeadElement;
  let scriptTag: HTMLScriptElement;
  let scriptSrc: string;
  let asyncTag: boolean;

  const setVariables = () => {
    docHead = fixture.debugElement.nativeNode.ownerDocument.head;
    scriptTag = docHead.querySelector(
      'script[src^="https://static.hotjar.com"]'
    );
    scriptSrc = scriptTag ? scriptTag.getAttribute("src") : null;
    asyncTag = scriptTag ? scriptTag.hasAttribute("async") : false;
  };

  describe("HotJar Enabled Module loader tests", () => {
    let hotJarConfig: HotJarConfig = {
      hotJarId: 1,
      hotJarSv: 2,
      enabled: true
    };
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes(routes),
          HotJarModule.forRoot(hotJarConfig)
        ],
        declarations: [AppComponent, MockComponent]
      }).compileComponents();

      router = TestBed.inject(Router);
      fixture = TestBed.createComponent(AppComponent);

      fixture.ngZone.run(() => {
        router.initialNavigation();
      });

      fixture.detectChanges();
    });

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

    it("script tag should contain the injected hotJarId", () => {
      expect(scriptSrc).toContain(`hotjar-${hotJarConfig.hotJarId}.js`);
    });

    it("script tag should contain the injected hotJarVersion", () => {
      expect(scriptSrc).toContain(`?sv=${hotJarConfig.hotJarSv}`);
    });

    it("script tag should contain the async attribute ", () => {
      expect(asyncTag).toBeTrue();
    });

    afterEach(() => {
      docHead = scriptTag = asyncTag = scriptSrc = null;
    });
  });

  describe("HotJar Disabled Module loader tests", () => {
    const disabledHotJarConfig: HotJarConfig = {
      hotJarId: 1,
      hotJarSv: 2,
      enabled: false
    };
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes(routes),
          HotJarModule.forRoot(disabledHotJarConfig)
        ],
        declarations: [AppComponent, MockComponent]
      }).compileComponents();

      router = TestBed.inject(Router);
      fixture = TestBed.createComponent(AppComponent);

      fixture.ngZone.run(() => {
        router.initialNavigation();
      });

      fixture.detectChanges();
    });

    beforeEach(() => {
      setVariables();
    });

    it("should create the mocked component", () => {
      const app = fixture.componentInstance;
      expect(app).toBeTruthy();
    });

    it("header tag should not contain the script tag", () => {
      expect(scriptTag).toBeNull();
    });

    it("script tag should not exist", () => {
      expect(scriptSrc).toBeNull();
    });

    it("script tag should not contain the async attribute ", () => {
      expect(asyncTag).toBeFalse();
    });

    afterEach(() => {
      docHead = scriptTag = asyncTag = scriptSrc = null;
    });
  });
});
