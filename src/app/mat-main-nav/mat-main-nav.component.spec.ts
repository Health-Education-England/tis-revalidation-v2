import { LayoutModule } from "@angular/cdk/layout";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { MatMainNavComponent } from "./mat-main-nav.component";
import { MaterialModule } from "../shared/material/material.module";
import { RouterTestingModule } from "@angular/router/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe("MatMainNavComponent", () => {
  let component: MatMainNavComponent;
  let fixture: ComponentFixture<MatMainNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatMainNavComponent],
      imports: [
        RouterTestingModule,
        LayoutModule,
        HttpClientModule,
        NoopAnimationsModule,
        MaterialModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatMainNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should compile", () => {
    expect(component).toBeTruthy();
  });
});
