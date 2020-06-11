import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { of } from "rxjs";
import { MaterialModule } from "../../shared/material/material.module";
import { RecordsService } from "../../shared/records/services/records.service";
import { RecommendationsFilterType } from "../recommendations.interfaces";
import {
  ClearSearch,
  Get,
  ResetPaginator,
  ResetSort,
  Filter
} from "../state/recommendations.actions";
import { RecommendationsState } from "../state/recommendations.state";

import { ResetRecommendationsListComponent } from "./reset-recommendations-list.component";

describe("ResetRecommendationsListComponent", () => {
  let store: Store;
  let component: ResetRecommendationsListComponent;
  let fixture: ComponentFixture<ResetRecommendationsListComponent>;
  let router: Router;
  let recordsService: RecordsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResetRecommendationsListComponent],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: "", component: ResetRecommendationsListComponent }
        ]),
        NgxsModule.forRoot([RecommendationsState]),
        HttpClientTestingModule
      ]
    }).compileComponents();
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    recordsService = TestBed.inject(RecordsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetRecommendationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    recordsService.stateName = "recommendations";
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should emit `resetSearchForm$` event on resetRecommendationsList()", () => {
    spyOn(recordsService.resetSearchForm$, "next").and.callThrough();
    component.resetRecommendationsList();
    expect(recordsService.resetSearchForm$.next).toHaveBeenCalledWith(true);
  });

  it("should dispatch relevant actions to reset recommendations list", () => {
    spyOn(store, "dispatch").and.returnValue(of({}));
    spyOn(router, "navigate");

    component.resetRecommendationsList();

    expect(store.dispatch).toHaveBeenCalledTimes(5);
    expect(store.dispatch).toHaveBeenCalledWith(new ResetSort());
    expect(store.dispatch).toHaveBeenCalledWith(new ResetPaginator());
    expect(store.dispatch).toHaveBeenCalledWith(
      new Filter(RecommendationsFilterType.UNDER_NOTICE)
    );
    expect(store.dispatch).toHaveBeenCalledWith(new ClearSearch());
    expect(store.dispatch).toHaveBeenCalledWith(new Get());
  });

  it("should invoke `updateRoute()` on resetRecommendationsList()", () => {
    spyOn(recordsService, "updateRoute");
    component.resetRecommendationsList();
    expect(recordsService.updateRoute).toHaveBeenCalled();
  });
});
