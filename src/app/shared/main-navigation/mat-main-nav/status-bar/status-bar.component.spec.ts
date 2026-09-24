import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { StatusBarComponent } from "./status-bar.component";
import { MaterialModule } from "src/app/shared/material/material.module";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthService } from "src/app/core/auth/auth.service";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

describe("StatusBarComponent", () => {
  let component: StatusBarComponent;
  let fixture: ComponentFixture<StatusBarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [StatusBarComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule],
    providers: [AuthService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
