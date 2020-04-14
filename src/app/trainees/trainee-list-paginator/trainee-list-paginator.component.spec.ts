import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { ActivatedRoute, Params } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { of } from "rxjs";
import {
  GetTrainees,
  PaginateTrainees,
  ResetTraineesPaginator,
  UpdateTraineesRoute
} from "../state/trainees.actions";
import { TraineesState } from "../state/trainees.state";

import { TraineeListPaginatorComponent } from "./trainee-list-paginator.component";

class MockActivatedRoute {
  snapshot = {
    get queryParams(): Params {
      return {};
    }
  };
}

describe("TraineeListPaginatorComponent", () => {
  let store: Store;
  let component: TraineeListPaginatorComponent;
  let fixture: ComponentFixture<TraineeListPaginatorComponent>;
  let route: ActivatedRoute;

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
          provide: ActivatedRoute,
          useClass: MockActivatedRoute
        }
      ],
      declarations: [TraineeListPaginatorComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    store = TestBed.inject(Store);
    route = TestBed.inject(ActivatedRoute);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeListPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should dispatch 'PaginateTrainees' if pageIndex exists", () => {
    const mockQueryParams: Params = {
      pageIndex: 6
    };

    spyOnProperty(route.snapshot, "queryParams").and.returnValue(
      mockQueryParams
    );
    spyOn(store, "dispatch");

    component.ngOnInit();

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).not.toHaveBeenCalledWith(
      new ResetTraineesPaginator()
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      new PaginateTrainees(mockQueryParams.pageIndex)
    );
  });

  it("should dispatch 'ResetTraineesPaginator' if pageIndex does not exist", () => {
    const mockQueryParams: Params = {};

    spyOnProperty(route.snapshot, "queryParams").and.returnValue(
      mockQueryParams
    );
    spyOn(store, "dispatch");

    component.ngOnInit();

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).not.toHaveBeenCalledWith(
      new PaginateTrainees(mockQueryParams.pageIndex)
    );
    expect(store.dispatch).toHaveBeenCalledWith(new ResetTraineesPaginator());
  });

  it("should dispatch relevant actions on 'paginateTrainees()'", () => {
    const mockPageEvent: PageEvent = {
      pageIndex: 2,
      previousPageIndex: 1,
      pageSize: 100,
      length: 20
    };
    spyOn(store, "dispatch").and.returnValue(of({}));

    component.paginateTrainees(mockPageEvent);

    expect(store.dispatch).toHaveBeenCalledTimes(3);
    expect(store.dispatch).toHaveBeenCalledWith(
      new PaginateTrainees(mockPageEvent.pageIndex)
    );
    expect(store.dispatch).toHaveBeenCalledWith(new GetTrainees());
    expect(store.dispatch).toHaveBeenCalledWith(new UpdateTraineesRoute());
  });
});
