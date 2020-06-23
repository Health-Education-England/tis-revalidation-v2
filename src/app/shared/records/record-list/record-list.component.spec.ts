import { HttpClientTestingModule } from "@angular/common/http/testing";
import { SimpleChange, SimpleChanges } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Sort as ISort } from "@angular/material/sort/sort";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { COLUMN_DATA } from "../../../concerns/constants";
import { RecommendationStatus } from "../../../recommendation/recommendation-history.interface";
import { IRecommendation } from "../../../recommendations/recommendations.interfaces";
import { mockRecommendationsResponse } from "../../../recommendations/services/recommendations.service.spec";
import {
  ClearSearch,
  Filter,
  Get,
  Paginate,
  ResetFilter,
  ResetPaginator,
  ResetSort,
  Search,
  Sort
} from "../../../recommendations/state/recommendations.actions";
import { RecommendationsState } from "../../../recommendations/state/recommendations.state";
import { MaterialModule } from "../../material/material.module";
import { DEFAULT_SORT, generateColumnData } from "../constants";
import { RecordsService } from "../services/records.service";
import { RecordListComponent } from "./record-list.component";

const mockSimpleChanges: SimpleChanges = {
  stateName: new SimpleChange(null, "recommendations", null)
};

describe("RecordListComponent", () => {
  let store: Store;
  let component: RecordListComponent;
  let fixture: ComponentFixture<RecordListComponent>;
  let router: Router;
  let recordsService: RecordsService;
  let state: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecordListComponent],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NgxsModule.forRoot([RecommendationsState])
      ]
    }).compileComponents();
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    recordsService = TestBed.inject(RecordsService);
    state = store.selectSnapshot((snapshot) => snapshot.recommendations);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordListComponent);
    component = fixture.componentInstance;
    recordsService.setActions(
      ClearSearch,
      Filter,
      Get,
      Paginate,
      ResetFilter,
      ResetPaginator,
      ResetSort,
      Search,
      Sort
    );
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should select 'items$' from state", () => {
    component.stateName = "recommendations";
    store.reset({
      recommendations: { items: mockRecommendationsResponse.traineeInfo }
    });

    component.items$.subscribe((value) => {
      expect(value).toBeInstanceOf(Array);
      expect(value.length).toBe(2);
    });
  });

  it("should select 'sort$' from state", () => {
    component.stateName = "recommendations";
    store.reset({ recommendations: { sort: DEFAULT_SORT } });

    component.sort$.subscribe((value) => {
      expect(value).toBeInstanceOf(Object);
      expect(value.active).toBe(DEFAULT_SORT.active);
      expect(value.direction).toBe(DEFAULT_SORT.direction);
    });
  });

  it("should invoke 'recordsService.get()' on ngOnChanges", () => {
    spyOn(recordsService, "get");
    component.ngOnChanges(mockSimpleChanges);
    expect(recordsService.get).toHaveBeenCalled();
  });

  it("should invoke 'handleRouteUpdates' on ngOnChanges", () => {
    spyOn(component, "handleRouteUpdates");
    component.ngOnChanges(mockSimpleChanges);
    expect(component.handleRouteUpdates).toHaveBeenCalled();
  });

  it("`columnNames()` should return an array of strings", () => {
    component.columnData = generateColumnData(COLUMN_DATA);
    expect(component.columnNames).toBeInstanceOf(Array);
    expect(component.columnNames[0]).toEqual("doctorFirstName");
  });

  it("'checkSorting()' should invoke 'recordsService.sort()' if params do not match", () => {
    spyOn(recordsService, "sort");

    component.params = {
      active: "doctorFirstName",
      direction: "asc"
    };
    component.checkSorting(state);

    expect(recordsService.sort).toHaveBeenCalledWith(
      component.params.active,
      component.params.direction
    );
  });

  it("'checkPagination()' should invoke 'recordsService.paginate()' if param does not match", () => {
    spyOn(recordsService, "paginate");

    component.params = { pageIndex: 4 };
    component.checkPagination(state);

    expect(recordsService.paginate).toHaveBeenCalledWith(
      component.params.pageIndex
    );
  });

  it("'checkSearchQuery()' should invoke 'recordsService.search()' if param does not match", () => {
    spyOn(recordsService, "search");
    const searchQuery = "dylon";

    state.searchQuery = "429123";
    component.params = { searchQuery };
    component.checkSearchQuery(state);

    expect(recordsService.search).toHaveBeenCalledWith(
      component.params.searchQuery
    );
  });

  it("'navigateToDetails()' should navigate to details route", () => {
    const mockEvent: Event = new MouseEvent("click");
    const mockRecommendation: IRecommendation = {
      dateAdded: "2015-05-14",
      doctorFirstName: "Bobby",
      doctorLastName: "Brown",
      gmcReferenceNumber: "7777777",
      sanction: "No",
      submissionDate: "2018-05-14",
      underNotice: "No",
      admin: "",
      cctDate: "2015-09-08",
      doctorStatus: RecommendationStatus.NOT_STARTED,
      lastUpdatedDate: "2015-09-08",
      programmeMembershipType: "",
      programmeName: ""
    };

    spyOn(mockEvent, "preventDefault");
    spyOn(router, "navigate");

    component.detailsRoute = "/trainee";
    component.navigateToDetails(mockEvent, mockRecommendation);
    expect(router.navigate).toHaveBeenCalledWith([
      component.detailsRoute,
      mockRecommendation.gmcReferenceNumber
    ]);
  });

  it("should sort recommendations", () => {
    const mockSortEvent: ISort = {
      active: "doctorFirstName",
      direction: "asc"
    };

    spyOn(recordsService, "sort");
    spyOn(recordsService, "resetPaginator").and.callThrough();
    spyOn(recordsService, "updateRoute");

    component.stateName = "recommendations";
    component.sort(mockSortEvent);

    expect(recordsService.sort).toHaveBeenCalledWith(
      mockSortEvent.active,
      mockSortEvent.direction
    );
    expect(recordsService.resetPaginator).toHaveBeenCalled();
    expect(recordsService.updateRoute).toHaveBeenCalled();
  });
});
