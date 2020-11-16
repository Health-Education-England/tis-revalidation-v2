import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

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
import { AuthService } from "src/app/core/auth/auth.service";
import { DetailsModule } from "src/app/details/details.module";

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
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          MaterialModule,
          RouterTestingModule,
          HttpClientTestingModule,
          NoopAnimationsModule,
          ReactiveFormsModule,
          DetailsModule,
          NgxsModule.forRoot([RecommendationHistoryState])
        ],
        providers: [
          AuthService,
          {
            provide: ActivatedRoute,
            useValue: activatedRoute
          }
        ],
        declarations: [CreateRecommendationComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
