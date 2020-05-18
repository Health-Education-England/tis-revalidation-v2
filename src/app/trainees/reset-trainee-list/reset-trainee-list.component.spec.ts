import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { of } from "rxjs";
import { TraineesFilterType } from "../trainees.interfaces";
import { TraineesService } from "../services/trainees.service";
import { MockTraineeService } from "../services/trainees.service.spec";
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
  let traineeService: TraineesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResetTraineeListComponent],
      imports: [
        RouterTestingModule,
        NgxsModule.forRoot([TraineesState]),
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: TraineesService,
          useClass: MockTraineeService
        }
      ]
    }).compileComponents();
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    traineeService = TestBed.inject(TraineesService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetTraineeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should emit `resetSearchForm$` event on resetTraineeList()", () => {
    spyOn(traineeService.resetSearchForm$, "next");
    component.resetTraineeList();
    expect(traineeService.resetSearchForm$.next).toHaveBeenCalledWith(true);
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

  it("should invoke `updateTraineesRoute()` on resetTraineeList()", () => {
    spyOn(traineeService, "updateTraineesRoute");
    component.resetTraineeList();
    expect(traineeService.updateTraineesRoute).toHaveBeenCalled();
  });
});
