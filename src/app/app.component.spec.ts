import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { AppComponent } from "./app.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { AdminsState } from "./shared/admins/state/admins.state";
import { MainNavigationModule } from "./shared/main-navigation/main-navigation.module";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe("AppComponent", () => {
  let store: Store;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MainNavigationModule,
        HttpClientTestingModule,
        NoopAnimationsModule, // no operation mock for replacing BrowserAnimationsModule in tests
        NgxsModule.forRoot([AdminsState])
      ],
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    store = TestBed.inject(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the app", () => {
    expect(component).toBeTruthy();
  });

  it("should create the app", () => {
    spyOn(store, "dispatch").and.callThrough();
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalled();
  });
});
