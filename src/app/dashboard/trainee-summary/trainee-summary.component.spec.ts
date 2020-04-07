import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { MaterialModule } from "../../shared/material/material.module";
import { TraineeSummaryComponent } from "./trainee-summary.component";
import { RouterTestingModule } from "@angular/router/testing";

describe("TraineeSummaryComponent", () => {
  let component: TraineeSummaryComponent;
  let fixture: ComponentFixture<TraineeSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MaterialModule],
      declarations: [TraineeSummaryComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  // TODO: test navigation tabs have x tabs based on nav-links object, test routes also work
});
