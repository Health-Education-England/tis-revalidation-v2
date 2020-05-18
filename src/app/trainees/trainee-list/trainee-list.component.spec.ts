import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatSortModule, Sort as ISort } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { of } from "rxjs";
import {
  ITrainee,
  TraineesFilterType
} from "../../core/trainee/trainee.interfaces";
import { TraineeService } from "../../core/trainee/trainee.service";
import { MockTraineeService } from "../../core/trainee/trainee.service.spec";
import {
  Filter,
  Get,
  Paginate,
  ResetPaginator,
  ResetSort,
  Search,
  Sort
} from "../state/trainees.actions";
import { TraineesState } from "../state/trainees.state";
import { TraineeListComponent } from "./trainee-list.component";

describe("TraineeListComponent", () => {
  let store: Store;
  let component: TraineeListComponent;
  let fixture: ComponentFixture<TraineeListComponent>;
  let router: Router;
  let traineeService: TraineeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TraineeListComponent],
      imports: [
        RouterTestingModule,
        NgxsModule.forRoot([TraineesState]),
        HttpClientTestingModule,
        MatTableModule,
        MatSortModule,
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: TraineeService,
          useClass: MockTraineeService
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    traineeService = TestBed.inject(TraineeService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should invoke 'setupInitialSorting' on init", () => {
    spyOn(component, "setupInitialSorting");
    component.ngOnInit();
    expect(component.setupInitialSorting).toHaveBeenCalled();
  });

  it("should invoke 'setupInitialPagination' on init", () => {
    spyOn(component, "setupInitialPagination");
    component.ngOnInit();
    expect(component.setupInitialPagination).toHaveBeenCalled();
  });

  it("should invoke 'checkInitialSearchQuery' on init", () => {
    spyOn(component, "checkInitialSearchQuery");
    component.ngOnInit();
    expect(component.checkInitialSearchQuery).toHaveBeenCalled();
  });

  it("should dispatch 'GetTrainees' on init", () => {
    spyOn(store, "dispatch");
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(new Get());
  });

  it("'setupInitialSorting()' should dispatch 'SortTrainees' if both params exist", () => {
    spyOn(store, "dispatch");

    component.params = {
      active: "doctorFirstName",
      direction: "asc"
    };
    component.setupInitialSorting();

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      new Sort(component.params.active, component.params.direction)
    );
    expect(store.dispatch).not.toHaveBeenCalledWith(new ResetSort());
  });

  it("'setupInitialSorting()' should dispatch 'ResetTraineesSort' if both params don't exist", () => {
    spyOn(store, "dispatch");

    component.params = {};
    component.setupInitialSorting();

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).not.toHaveBeenCalledWith(
      new Sort(component.params.active, component.params.direction)
    );
    expect(store.dispatch).toHaveBeenCalledWith(new ResetSort());
  });

  it("'setupInitialPagination()' should dispatch 'PaginateTrainees' if param exists", () => {
    spyOn(store, "dispatch");

    component.params = { pageIndex: 4 };
    component.setupInitialPagination();

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      new Paginate(component.params.pageIndex)
    );
    expect(store.dispatch).not.toHaveBeenCalledWith(new ResetPaginator());
  });

  it("'setupInitialPagination()' should dispatch 'ResetTraineesPaginator' if param does not exist", () => {
    spyOn(store, "dispatch");

    component.params = {};
    component.setupInitialPagination();

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new ResetPaginator());
    expect(store.dispatch).not.toHaveBeenCalledWith(
      new Paginate(component.params.pageIndex)
    );
  });

  it("'setupInitialFilter()' should dispatch 'AllDoctorsFilter' if param value is `allDoctors`", () => {
    spyOn(store, "dispatch");

    component.params = { filter: TraineesFilterType.ALL_DOCTORS };
    component.setupInitialFilter();

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      new Filter(TraineesFilterType.ALL_DOCTORS)
    );
    expect(store.dispatch).not.toHaveBeenCalledWith(
      new Filter(TraineesFilterType.UNDER_NOTICE)
    );
  });

  it("'setupInitialFilter()' should dispatch 'UnderNoticeFilter' if param does not exist", () => {
    spyOn(store, "dispatch");

    component.setupInitialFilter();

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      new Filter(TraineesFilterType.UNDER_NOTICE)
    );
    expect(store.dispatch).not.toHaveBeenCalledWith(
      new Filter(TraineesFilterType.ALL_DOCTORS)
    );
  });

  it("'checkInitialSearchQuery()' should dispatch 'SearchTrainees' if param exists", () => {
    spyOn(store, "dispatch");

    component.params = { searchQuery: "429123" };
    component.checkInitialSearchQuery();

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      new Search(component.params.searchQuery)
    );
  });

  it("'traineeDetails()' should navigate to details route", () => {
    const mockEvent: Event = new MouseEvent("click");
    const mockTrainee: ITrainee = {
      dateAdded: "2015-05-14",
      doctorFirstName: "Bobby",
      doctorLastName: "Brown",
      gmcReferenceNumber: "7777777",
      sanction: "No",
      submissionDate: "2018-05-14",
      underNotice: "No",
      admin: "",
      cctDate: "2015-09-08",
      doctorStatus: "",
      lastUpdatedDate: "2015-09-08",
      programmeMembershipType: "",
      programmeName: ""
    };

    spyOn(mockEvent, "preventDefault");
    spyOn(router, "navigate");

    component.navigateToDetails(mockEvent, mockTrainee);
    expect(router.navigate).toHaveBeenCalledWith([
      "/trainee",
      mockTrainee.gmcReferenceNumber
    ]);
  });

  it("should sort trainees", () => {
    const mockSortEvent: ISort = {
      active: "doctorFirstName",
      direction: "asc"
    };

    spyOn(store, "dispatch").and.returnValue(of({}));
    spyOn(router, "navigate");
    spyOn(traineeService, "updateTraineesRoute");

    component.sort(mockSortEvent);

    expect(store.dispatch).toHaveBeenCalledTimes(3);
    expect(store.dispatch).toHaveBeenCalledWith(
      new Sort(mockSortEvent.active, mockSortEvent.direction)
    );
    expect(store.dispatch).toHaveBeenCalledWith(new ResetPaginator());
    expect(store.dispatch).toHaveBeenCalledWith(new Get());
    expect(traineeService.updateTraineesRoute).toHaveBeenCalled();
  });
});
