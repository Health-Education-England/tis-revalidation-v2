import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { of } from "rxjs";
import {
  ClearTraineesFilter,
  GetTrainees,
  ResetTraineesPaginator,
  ResetTraineesSort,
  UpdateTraineesRoute
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
    spyOn(store, "dispatch").and.returnValue(of({}));
    spyOn(router, "navigate");

    component.resetTraineeList();

    expect(store.dispatch).toHaveBeenCalledTimes(5);
    expect(store.dispatch).toHaveBeenCalledWith(new ResetTraineesSort());
    expect(store.dispatch).toHaveBeenCalledWith(new ResetTraineesPaginator());
    expect(store.dispatch).toHaveBeenCalledWith(new ClearTraineesFilter());
    expect(store.dispatch).toHaveBeenCalledWith(new GetTrainees());
    expect(store.dispatch).toHaveBeenCalledWith(new UpdateTraineesRoute());
  });
});
