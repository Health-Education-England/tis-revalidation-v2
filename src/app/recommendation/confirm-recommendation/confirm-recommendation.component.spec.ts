import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ConfirmRecommendationComponent } from "./confirm-recommendation.component";

describe("ConfirmRecommendationComponent", () => {
  let component: ConfirmRecommendationComponent;
  let fixture: ComponentFixture<ConfirmRecommendationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmRecommendationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
