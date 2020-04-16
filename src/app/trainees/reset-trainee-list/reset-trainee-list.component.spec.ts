import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { Observable, of } from "rxjs";
import { TraineeService } from "../../core/trainee/trainee.service";
import {
  ClearTraineesFilter,
  ClearTraineesSearch,
  GetTrainees,
  ResetTraineesPaginator,
  ResetTraineesSort
} from "../state/trainees.actions";
import { TraineesState } from "../state/trainees.state";

import { ResetTraineeListComponent } from "./reset-trainee-list.component";

class MockTraineeService {
  public getTrainees(): Observable<any> {
    return of({});
  }

  public updateTraineesRoute(): Observable<any> {
    return of({});
  }
}

describe("ResetTraineeListComponent", () => {
  let store: Store;
  let component: ResetTraineeListComponent;
  let fixture: ComponentFixture<ResetTraineeListComponent>;
  let router: Router;
  let traineeService: TraineeService;

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
          provide: TraineeService,
          useClass: MockTraineeService
        }
      ]
    }).compileComponents();
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    traineeService = TestBed.inject(TraineeService);
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
    spyOn(traineeService, "updateTraineesRoute");

    component.resetTraineeList();

    expect(store.dispatch).toHaveBeenCalledTimes(5);
    expect(store.dispatch).toHaveBeenCalledWith(new ResetTraineesSort());
    expect(store.dispatch).toHaveBeenCalledWith(new ResetTraineesPaginator());
    expect(store.dispatch).toHaveBeenCalledWith(new ClearTraineesFilter());
    expect(store.dispatch).toHaveBeenCalledWith(new ClearTraineesSearch());
    expect(store.dispatch).toHaveBeenCalledWith(new GetTrainees());
    expect(traineeService.updateTraineesRoute).toHaveBeenCalled();
  });
});
