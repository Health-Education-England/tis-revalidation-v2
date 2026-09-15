import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { ConcernComponent } from "./concern.component";
import { NgxsModule } from "@ngxs/store";
import { ConcernState } from "./state/concern.state";
import { ConcernService } from "./services/concern/concern.service";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { MaterialModule } from "../shared/material/material.module";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthService } from "../core/auth/auth.service";
import { ConcernStatus, IConcernSummary } from "./concern.interfaces";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

describe("ConcernComponent", () => {
  let component: ConcernComponent;
  let fixture: ComponentFixture<ConcernComponent>;
  let authService: AuthService;
  const element: IConcernSummary = {
    admin: "dummy@dummy.com",
    comments: [],
    concernId: null,
    concernType: null,
    dateOfIncident: new Date(),
    dateReported: new Date(),
    employer: null,
    followUpDate: new Date(),
    gmcNumber: 3568685,
    grade: null,
    lastUpdatedDate: new Date(),
    site: null,
    source: null,
    status: ConcernStatus.OPEN
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [ConcernComponent],
    imports: [NgxsModule.forRoot([ConcernState]),
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule],
    providers: [AuthService, ConcernService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
  }));

  beforeEach(() => {
    authService = TestBed.inject(AuthService);
    authService.isRevalAdmin = true;

    fixture = TestBed.createComponent(ConcernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
    expect(component.isRevalAdmin).toBeTruthy();
  });

  it("should set the expandedElement to null when element is already expanded", () => {
    component.expandedElement = element;
    const event = new MouseEvent("click");
    spyOn(event, "preventDefault");

    component.currentExpanded(element, event);
    expect(component.expandedElement).toBeNull();
  });

  it("should set the expandedElement when connection history row data is passed", () => {
    component.expandedElement = null;
    const event = new MouseEvent("click");
    spyOn(event, "preventDefault");

    component.currentExpanded(element, event);
    expect(component.expandedElement).toBe(element);
  });
});
