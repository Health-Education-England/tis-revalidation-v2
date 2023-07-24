import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NgZone } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MatLegacyPaginatorModule as MatPaginatorModule, LegacyPageEvent as PageEvent } from "@angular/material/legacy-paginator";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { RecommendationsState } from "../../recommendations/state/recommendations.state";
import { DEFAULT_SORT } from "../constants";
import { RecordsService } from "../services/records.service";
import { RecordListPaginatorComponent } from "./record-list-paginator.component";

describe("RecordListPaginatorComponent", () => {
  let store: Store;
  let component: RecordListPaginatorComponent;
  let fixture: ComponentFixture<RecordListPaginatorComponent>;
  let recordsService: RecordsService;
  const mockPageEvent: PageEvent = {
    pageIndex: 2,
    previousPageIndex: 1,
    pageSize: 100,
    length: 20
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatPaginatorModule,
        NoopAnimationsModule,
        NgxsModule.forRoot([RecommendationsState]),
        HttpClientTestingModule
      ],
      declarations: [RecordListPaginatorComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    store = TestBed.inject(Store);
    recordsService = TestBed.inject(RecordsService);
    recordsService.stateName = "recommendations";
    recordsService.setRecommendationsActions();
    store.reset({ recommendations: { sort: DEFAULT_SORT } });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordListPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should dispatch 'paginate()' event", () => {
    spyOn(recordsService, "paginate").and.callThrough();
    component.paginate(mockPageEvent);
    expect(recordsService.paginate).toHaveBeenCalledTimes(1);
    expect(recordsService.paginate).toHaveBeenCalledWith(
      mockPageEvent.pageIndex
    );
  });

  it("should invoke 'recordsService.updateRoute()' method", () => {
    spyOn(recordsService, "updateRoute").and.callThrough();
    new NgZone({}).run(() => component.paginate(mockPageEvent));

    expect(recordsService.updateRoute).toHaveBeenCalled();
  });
});
