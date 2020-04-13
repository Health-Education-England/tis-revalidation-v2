import {
  async,
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync
} from "@angular/core/testing";

import { TraineesListComponent } from "./trainees-list.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "src/app/shared/material/material.module";
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRoute, Router, Routes } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { of } from "rxjs";
import {
  traineesResponse1,
  underNoticeResponse1
} from "../spec-data/spec.trainees";
import { DefaultRouteParams, ITraineeRouteParams } from "../trainees.interface";

describe("TraineesListComponent", () => {
  let component: TraineesListComponent;
  let fixture: ComponentFixture<TraineesListComponent>;
  const resolvedData: any = {};
  let mockResponse = traineesResponse1;
  let routeParams: ITraineeRouteParams = DefaultRouteParams;

  const routes: Routes = [
    { path: "", component: TraineesListComponent },
    { path: "under-notice", component: TraineesListComponent }
  ];

  const mockObservable = () => {
    resolvedData.snapshot = { params: routeParams };
    resolvedData.data = of({
      store: {
        doctors: {
          items: mockResponse.traineeInfo,
          params: resolvedData.snapshot.params,
          countUnderNotice: mockResponse.countUnderNotice,
          countTotal: mockResponse.countTotal
        }
      }
    });
  };

  beforeEach(async(() => {
    mockObservable();
  }));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MaterialModule,
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [TraineesListComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: resolvedData
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should load on default store object state with empty data", fakeAsync(() => {
    resolvedData.data = of({
      store: {
        doctors: {
          items: [],
          params: {},
          countUnderNotice: 0,
          countTotal: 0
        }
      }
    });

    component.ngOnInit();
    tick(50);
    expect(component.doctors.length).toBe(0);
    expect(component.sort.active).not.toBeDefined();
    expect(component.sort.direction).not.toBeDefined();
    expect(component.pageNumber).not.toBeDefined();
  }));

  it("should set component variables from response", fakeAsync(() => {
    mockObservable();
    component.ngOnInit();
    tick(50);
    expect(component.doctors.length).toBe(mockResponse.traineeInfo.length);
    expect(component.sort.active).toBe(routeParams.sortColumn);
    expect(component.sort.direction).toBe(routeParams.sortOrder);
    expect(component.pageNumber).toBe(routeParams.pageNumber);
  }));

  it("should display countTotal as count", fakeAsync(() => {
    routeParams = DefaultRouteParams;
    mockResponse = traineesResponse1;
    mockObservable();
    component.ngOnInit();
    tick(50);
    expect(component.count).toBe(mockResponse.countTotal);
  }));

  it("should display count as under-notice count", fakeAsync(() => {
    routeParams = {
      ...routeParams,
      ...{ underNotice: true }
    };
    mockResponse = underNoticeResponse1;
    mockObservable();
    component.ngOnInit();
    tick(50);
    expect(component.count).toBe(mockResponse.countUnderNotice);
  }));

  it("test search form and controls", fakeAsync(() => {
    mockObservable();
    component.ngOnInit();

    expect(component.searchTraineesForm).toBeDefined();
    expect(component.searchTrainees).toBeDefined();
  }));
});
