import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { Observable, of } from "rxjs";
import { TraineeService } from "../../core/trainee/trainee.service";
import { GetTrainees, PaginateTrainees } from "../state/trainees.actions";
import { TraineesState } from "../state/trainees.state";

import { TraineeListPaginatorComponent } from "./trainee-list-paginator.component";

class MockTraineeService {
  public getTrainees(): Observable<any> {
    return of({});
  }

  public updateTraineesRoute(): Observable<any> {
    return of({});
  }
}

describe("TraineeListPaginatorComponent", () => {
  let store: Store;
  let component: TraineeListPaginatorComponent;
  let fixture: ComponentFixture<TraineeListPaginatorComponent>;
  let traineeService: TraineeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatPaginatorModule,
        NgxsModule.forRoot([TraineesState]),
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: TraineeService,
          useClass: MockTraineeService
        }
      ],
      declarations: [TraineeListPaginatorComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    store = TestBed.inject(Store);
    traineeService = TestBed.inject(TraineeService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeListPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should dispatch relevant actions on 'paginateTrainees()'", () => {
    const mockPageEvent: PageEvent = {
      pageIndex: 2,
      previousPageIndex: 1,
      pageSize: 100,
      length: 20
    };
    spyOn(store, "dispatch").and.returnValue(of({}));
    spyOn(traineeService, "updateTraineesRoute");

    component.paginateTrainees(mockPageEvent);

    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith(
      new PaginateTrainees(mockPageEvent.pageIndex)
    );
    expect(store.dispatch).toHaveBeenCalledWith(new GetTrainees());
    expect(traineeService.updateTraineesRoute).toHaveBeenCalled();
  });
});
