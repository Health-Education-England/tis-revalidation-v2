import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule } from "@ngxs/store";
import { MaterialModule } from "../../shared/material/material.module";
import { RecommendationHistoryState } from "../state/recommendation-history.state";

import { ConfirmRecommendationComponent } from "./confirm-recommendation.component";

describe("ConfirmRecommendationComponent", () => {
  let component: ConfirmRecommendationComponent;
  let fixture: ComponentFixture<ConfirmRecommendationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmRecommendationComponent],
      imports: [
        MaterialModule,
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([RecommendationHistoryState])
      ]
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
