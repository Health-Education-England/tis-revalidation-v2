import { RecommendationResolver } from "./recommendation.resolver";
import { TestBed, waitForAsync } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { RecommendationHistoryState } from "./state/recommendation-history.state";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RecommendationNotesState } from "./state/recommendation-notes.state";
import { MaterialModule } from "../shared/material/material.module";

@Component({
  template: `blank`
})
export class BlankComponent {}

describe("RecommendationResolver", () => {
  let router: Router;
  let store: Store;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        NgxsModule.forRoot([RecommendationHistoryState]),
        NgxsModule.forRoot([RecommendationNotesState]),
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: "", component: BlankComponent }
        ])
      ]
    }).compileComponents();
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
  }));

  it("should create an instance", () => {
    expect(new RecommendationResolver(store, router)).toBeTruthy();
  });
});
