import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { MaterialModule } from "../../shared/material/material.module";
import { INavLink } from "../details.interfaces";

import { NavBarComponent } from "./nav-bar.component";

describe("NavBarComponent", () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      imports: [RouterTestingModule, MaterialModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create component", () => {
    expect(component).toBeTruthy();
  });

  it("should create navLinks", () => {
    expect(component.navLinks).toBeInstanceOf(Array);
    expect(component.navLinks.length).toEqual(2);
  });

  it("navLinks should have a label", () => {
    const emptyLabelNavLinks: INavLink[] = component.navLinks.filter(
      (item) => !item.label.length
    );
    expect(emptyLabelNavLinks.length).toBe(0);
  });
});
