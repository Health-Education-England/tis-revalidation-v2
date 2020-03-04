import { TestBed, async } from "@angular/core/testing";
import { HotJarModule, HotJarConfig } from "./hotjar.module";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { AppComponent, MockComponent, routes } from "../mock.test.component";

describe("MockComponent", () => {
  let router: Router;
  let fixture: any;
  const hotJarConfig: HotJarConfig = {
    hotJarId: 1,
    hotJarSv: 2,
    enabled: true
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
  }));

  it("should create the mock component", () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  describe("HotJar Module loader tests", () => {
    let docHead: HTMLHeadElement;
    let scriptTag: HTMLScriptElement;
    let scriptSrc: string;
    let asyncTag: boolean;

    beforeEach(() => {
      docHead = fixture.debugElement.nativeNode.ownerDocument.head;
      scriptTag = docHead.querySelector(
        'script[src^="https://static.hotjar.com"]'
      );
      scriptSrc = scriptTag.getAttribute("src");
      asyncTag = scriptTag.hasAttribute("async");
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
  });
});
