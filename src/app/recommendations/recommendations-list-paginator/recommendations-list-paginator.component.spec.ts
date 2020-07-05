import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { DEFAULT_SORT } from "../../shared/records/constants";
import { RecordsService } from "../../shared/records/services/records.service";
import { PaginateRecommendations } from "../state/recommendations.actions";

import { RecommendationsState } from "../state/recommendations.state";

import { RecommendationsListPaginatorComponent } from "./recommendations-list-paginator.component";

describe("RecommendationsListPaginatorComponent", () => {
  let store: Store;
  let component: RecommendationsListPaginatorComponent;
  let fixture: ComponentFixture<RecommendationsListPaginatorComponent>;
  let recordsService: RecordsService;
  const mockPageEvent: PageEvent = {
    pageIndex: 2,
    previousPageIndex: 1,
    pageSize: 100,
    length: 20
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatPaginatorModule,
        NoopAnimationsModule,
        NgxsModule.forRoot([RecommendationsState]),
        HttpClientTestingModule
      ],
      declarations: [RecommendationsListPaginatorComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    store = TestBed.inject(Store);
    recordsService = TestBed.inject(RecordsService);
    recordsService.stateName = "recommendations";
    store.reset({ recommendations: { sort: DEFAULT_SORT } });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationsListPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should dispatch 'paginate()' event", () => {
    spyOn(store, "dispatch").and.callThrough();
    component.paginate(mockPageEvent);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      new PaginateRecommendations(mockPageEvent.pageIndex)
    );
  });

  it("should invoke 'recordsService.updateRoute()' method", () => {
    spyOn(recordsService, "updateRoute").and.callThrough();
    component.paginate(mockPageEvent);
    expect(recordsService.updateRoute).toHaveBeenCalled();
  });
});
