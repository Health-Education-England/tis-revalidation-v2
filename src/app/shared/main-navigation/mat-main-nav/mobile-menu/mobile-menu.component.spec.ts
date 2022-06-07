import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MobileMenuComponent } from "./mobile-menu.component";
import { MaterialModule } from "src/app/shared/material/material.module";
import { RouterTestingModule } from "@angular/router/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe("MobileMenuComponent", () => {
  let component: MobileMenuComponent;
  let fixture: ComponentFixture<MobileMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MaterialModule, RouterTestingModule],
      declarations: [MobileMenuComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should emit close mobile menu", () => {
    spyOn(component.closeMenu, "emit");
    component.onMenuClick();
    expect(component.closeMenu.emit).toHaveBeenCalled();
  });
});
