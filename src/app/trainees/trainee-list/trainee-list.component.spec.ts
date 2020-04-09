import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Sort } from "@angular/material/sort";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { of } from "rxjs";
import { ITrainee } from "../../core/trainee/trainee.interfaces";
import {
  GetTrainees,
  ResetTraineesPaginator,
  ResetTraineesSort,
  SortTrainees,
  UpdateTraineesRoute
} from "../state/trainees.actions";
import { TraineesState } from "../state/trainees.state";
import { TraineeListComponent } from "./trainee-list.component";

class MockActivatedRoute {
  snapshot = {
    get queryParams(): Params {
      return {};
    }
  };
}

describe("TraineeListComponent", () => {
  let store: Store;
  let component: TraineeListComponent;
  let fixture: ComponentFixture<TraineeListComponent>;
  let route: ActivatedRoute;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TraineeListComponent],
      imports: [
        RouterTestingModule,
        NgxsModule.forRoot([TraineesState]),
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useClass: MockActivatedRoute
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
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

  it("should dispatch 'GetTrainees' on init", () => {
    spyOn(store, "dispatch");
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(new GetTrainees());
  });

  it("'setupInitialSorting()' should dispatch 'SortTrainees' if both params exist", () => {
    const mockQueryParams: Params = {
      active: "doctorFirstName",
      direction: "asc"
    };

    spyOnProperty(route.snapshot, "queryParams").and.returnValue(
      mockQueryParams
    );
    spyOn(store, "dispatch");

    component.setupInitialSorting();

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      new SortTrainees(mockQueryParams.active, mockQueryParams.direction)
    );
    expect(store.dispatch).not.toHaveBeenCalledWith(new ResetTraineesSort());
  });

  it("'setupInitialSorting()' should dispatch 'ResetTraineesSort' if both params don't exist", () => {
    const mockQueryParams: Params = {};

    spyOnProperty(route.snapshot, "queryParams").and.returnValue(
      mockQueryParams
    );
    spyOn(store, "dispatch");

    component.setupInitialSorting();

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).not.toHaveBeenCalledWith(
      new SortTrainees(mockQueryParams.active, mockQueryParams.direction)
    );
    expect(store.dispatch).toHaveBeenCalledWith(new ResetTraineesSort());
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

    component.traineeDetails(mockEvent, mockTrainee);
    expect(router.navigate).toHaveBeenCalledWith([
      "/trainees",
      mockTrainee.gmcReferenceNumber
    ]);
  });

  it("should sort trainees", () => {
    const mockSortEvent: Sort = {
      active: "doctorFirstName",
      direction: "asc"
    };

    spyOn(store, "dispatch").and.returnValue(of({}));
    spyOn(router, "navigate");

    component.sortTrainees(mockSortEvent);

    expect(store.dispatch).toHaveBeenCalledWith([
      new SortTrainees(mockSortEvent.active, mockSortEvent.direction),
      new ResetTraineesPaginator(),
      new GetTrainees(),
      new UpdateTraineesRoute()
    ]);
  });
});
