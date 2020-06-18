import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CreateRecommendationComponent } from "./create-recommendation.component";
import { MaterialModule } from "src/app/shared/material/material.module";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule } from "@ngxs/store";
import { RecommendationHistoryState } from "../state/recommendation-history.state";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  template: `blank`
})
export class BlankComponent {}

describe("CreateRecommendationComponent", () => {
  let component: CreateRecommendationComponent;
  let fixture: ComponentFixture<CreateRecommendationComponent>;
  const activatedRoute = {
    parent: { snapshot: { params: { gmcNumber: 0 } } }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        NgxsModule.forRoot([RecommendationHistoryState])
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRoute
        }
      ],
      declarations: [CreateRecommendationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
