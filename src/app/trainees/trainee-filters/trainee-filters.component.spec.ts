import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { TraineeService } from "../../core/trainee/trainee.service";
import { MockTraineeService } from "../../core/trainee/trainee.service.spec";
import {
  AllDoctorsFilter,
  ClearSearch,
  Get,
  ResetPaginator,
  ResetSort,
  UnderNoticeFilter
} from "../state/trainees.actions";
import { TraineesState } from "../state/trainees.state";

import { TraineeFiltersComponent } from "./trainee-filters.component";

describe("TraineeFiltersComponent", () => {
  let store: Store;
  let component: TraineeFiltersComponent;
  let fixture: ComponentFixture<TraineeFiltersComponent>;
  let traineeService: TraineeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TraineeFiltersComponent],
      imports: [
        RouterTestingModule,
        NgxsModule.forRoot([TraineesState]),
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: TraineeService,
          useClass: MockTraineeService
        }
      ]
    }).compileComponents();
    store = TestBed.inject(Store);
    traineeService = TestBed.inject(TraineeService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("`filterByAllDoctors()` should dispatch `AllDoctorsFilter` event", () => {
    spyOn(store, "dispatch").and.callThrough();
    component.filterByAllDoctors();
    expect(store.dispatch).toHaveBeenCalledWith(new AllDoctorsFilter());
  });

  it("`filterByAllDoctors()` should invoke `getTrainees()`", () => {
    spyOn(component, "getTrainees");
    component.filterByAllDoctors();
    expect(component.getTrainees).toHaveBeenCalled();
  });

  it("`filterByUnderNotice()` should dispatch `UnderNoticeFilter` event", () => {
    spyOn(store, "dispatch").and.callThrough();
    component.filterByUnderNotice();
    expect(store.dispatch).toHaveBeenCalledWith(new UnderNoticeFilter());
  });

  it("`filterByUnderNotice()` should invoke `getTrainees()`", () => {
    spyOn(component, "getTrainees");
    component.filterByUnderNotice();
    expect(component.getTrainees).toHaveBeenCalled();
  });

  it("`getTrainees()` should dispatch relevant events", () => {
    spyOn(store, "dispatch").and.callThrough();

    component.getTrainees();

    expect(store.dispatch).toHaveBeenCalledTimes(4);
    expect(store.dispatch).toHaveBeenCalledWith(new ResetSort());
    expect(store.dispatch).toHaveBeenCalledWith(new ResetPaginator());
    expect(store.dispatch).toHaveBeenCalledWith(new ClearSearch());
    expect(store.dispatch).toHaveBeenCalledWith(new Get());
  });

  it("`getTrainees()` should invoke `updateTraineesRoute()`", () => {
    spyOn(traineeService, "updateTraineesRoute");
    component.getTrainees();
    expect(traineeService.updateTraineesRoute).toHaveBeenCalled();
  });
});
