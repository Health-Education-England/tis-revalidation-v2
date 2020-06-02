import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { of } from "rxjs";
import { MaterialModule } from "../../shared/material/material.module";
import { RecordsService } from "../../shared/records/services/records.service";
import { TraineesFilterType } from "../trainees.interfaces";
import {
  ClearSearch,
  Get,
  ResetPaginator,
  ResetSort,
  Filter
} from "../state/trainees.actions";
import { TraineesState } from "../state/trainees.state";

import { ResetTraineeListComponent } from "./reset-trainee-list.component";

describe("ResetTraineeListComponent", () => {
  let store: Store;
  let component: ResetTraineeListComponent;
  let fixture: ComponentFixture<ResetTraineeListComponent>;
  let router: Router;
  let recordsService: RecordsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResetTraineeListComponent],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: "", component: ResetTraineeListComponent }
        ]),
        NgxsModule.forRoot([TraineesState]),
        HttpClientTestingModule
      ]
    }).compileComponents();
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    recordsService = TestBed.inject(RecordsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetTraineeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    recordsService.stateName = "trainees";
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should emit `resetSearchForm$` event on resetTraineeList()", () => {
    spyOn(recordsService.resetSearchForm$, "next").and.callThrough();
    component.resetTraineeList();
    expect(recordsService.resetSearchForm$.next).toHaveBeenCalledWith(true);
  });

  it("should dispatch relevant actions to reset trainee list", () => {
    spyOn(store, "dispatch").and.returnValue(of({}));
    spyOn(router, "navigate");

    component.resetTraineeList();

    expect(store.dispatch).toHaveBeenCalledTimes(5);
    expect(store.dispatch).toHaveBeenCalledWith(new ResetSort());
    expect(store.dispatch).toHaveBeenCalledWith(new ResetPaginator());
    expect(store.dispatch).toHaveBeenCalledWith(
      new Filter(TraineesFilterType.UNDER_NOTICE)
    );
    expect(store.dispatch).toHaveBeenCalledWith(new ClearSearch());
    expect(store.dispatch).toHaveBeenCalledWith(new Get());
  });

  it("should invoke `updateRoute()` on resetTraineeList()", () => {
    spyOn(recordsService, "updateRoute");
    component.resetTraineeList();
    expect(recordsService.updateRoute).toHaveBeenCalled();
  });
});
