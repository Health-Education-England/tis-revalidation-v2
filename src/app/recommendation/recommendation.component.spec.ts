import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { RecommendationComponent } from "./recommendation.component";
import { RouterTestingModule } from "@angular/router/testing";
import { MaterialModule } from "../shared/material/material.module";

describe("RecommendationComponent", () => {
  let component: RecommendationComponent;
  let fixture: ComponentFixture<RecommendationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MaterialModule, NoopAnimationsModule],
      declarations: [RecommendationComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
