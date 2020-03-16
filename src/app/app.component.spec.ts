import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { MainNavigationModule } from "./shared/main-navigation/main-navigation.module";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MainNavigationModule,
        NoopAnimationsModule // no operation mock for replacing BrowserAnimationsModule in tests
      ],
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  xit(`should have title as 'revalidation'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual("revalidation");
  });

  xit("should render title", () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector(".nhsuk-body").textContent).toContain(
      "revalidation app is running!"
    );
  });
});
