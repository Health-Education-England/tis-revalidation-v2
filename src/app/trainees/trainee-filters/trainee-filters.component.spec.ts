import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { MaterialModule } from "../../shared/material/material.module";
import { RecordsService } from "../../shared/records/services/records.service";
import { TraineesFilterType } from "../trainees.interfaces";
import {
  Filter,
  ClearSearch,
  Get,
  ResetPaginator,
  ResetSort
} from "../state/trainees.actions";
import { TraineesState } from "../state/trainees.state";

import { TraineeFiltersComponent } from "./trainee-filters.component";

describe("TraineeFiltersComponent", () => {
  let store: Store;
  let component: TraineeFiltersComponent;
  let fixture: ComponentFixture<TraineeFiltersComponent>;
  let recordsService: RecordsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: "", component: TraineeFiltersComponent }
        ]),
        NgxsModule.forRoot([TraineesState]),
        HttpClientTestingModule
      ],
      declarations: [TraineeFiltersComponent]
    }).compileComponents();
    store = TestBed.inject(Store);
    recordsService = TestBed.inject(RecordsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    recordsService.stateName = "trainees";
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("`filterByAllDoctors()` should dispatch `AllDoctorsFilter` event", () => {
    spyOn(store, "dispatch").and.callThrough();
    component.filterByAllDoctors();
    expect(store.dispatch).toHaveBeenCalledWith(
      new Filter(TraineesFilterType.ALL_DOCTORS)
    );
  });

  it("`filterByAllDoctors()` should invoke `getTrainees()`", () => {
    spyOn(component, "getTrainees");
    component.filterByAllDoctors();
    expect(component.getTrainees).toHaveBeenCalled();
  });

  it("`filterByUnderNotice()` should dispatch `UnderNoticeFilter` event", () => {
    spyOn(store, "dispatch").and.callThrough();
    component.filterByUnderNotice();
    expect(store.dispatch).toHaveBeenCalledWith(
      new Filter(TraineesFilterType.UNDER_NOTICE)
    );
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

  it("`getTrainees()` should invoke `updateRoute()`", () => {
    spyOn(recordsService, "updateRoute");
    component.getTrainees();
    expect(recordsService.updateRoute).toHaveBeenCalled();
  });
});
