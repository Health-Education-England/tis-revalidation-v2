import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Sort } from "@angular/material/sort";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { of } from "rxjs";
import { DEFAULT_ROUTE_SORT } from "../../core/trainee/constants";
import {
  ClearTraineesFilter,
  GetTrainees,
  ResetTraineesSort
} from "../state/trainees.actions";
import { TraineesState } from "../state/trainees.state";

import { ResetTraineeListComponent } from "./reset-trainee-list.component";

describe("ResetTraineeListComponent", () => {
  let store: Store;
  let component: ResetTraineeListComponent;
  let fixture: ComponentFixture<ResetTraineeListComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResetTraineeListComponent],
      imports: [
        RouterTestingModule,
        NgxsModule.forRoot([TraineesState]),
        HttpClientTestingModule
      ]
    }).compileComponents();
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetTraineeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should dispatch relevant actions to reset trainee list", () => {
    const mockSortEvent: Sort = DEFAULT_ROUTE_SORT;

    spyOn(store, "dispatch").and.returnValue(of({}));
    spyOn(router, "navigate");

    component.resetTraineeList();

    expect(store.dispatch).toHaveBeenCalledWith([
      new ResetTraineesSort(),
      new ClearTraineesFilter(),
      new GetTrainees()
    ]);

    expect(router.navigate).toHaveBeenCalledWith(["/trainees"], {
      queryParams: mockSortEvent
    });
  });
});
