import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { DesktopMenuComponent } from "./desktop-menu.component";
import { RouterTestingModule } from "@angular/router/testing";
import { MaterialModule } from "src/app/shared/material/material.module";

describe("DesktopMenuComponent", () => {
  let component: DesktopMenuComponent;
  let fixture: ComponentFixture<DesktopMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DesktopMenuComponent],
      imports: [MaterialModule, RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
