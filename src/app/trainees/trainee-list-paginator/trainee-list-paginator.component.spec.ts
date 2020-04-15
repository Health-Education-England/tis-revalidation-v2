import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { of } from "rxjs";
import {
  GetTrainees,
  PaginateTrainees,
  UpdateTraineesRoute
} from "../state/trainees.actions";
import { TraineesState } from "../state/trainees.state";

import { TraineeListPaginatorComponent } from "./trainee-list-paginator.component";

describe("TraineeListPaginatorComponent", () => {
  let store: Store;
  let component: TraineeListPaginatorComponent;
  let fixture: ComponentFixture<TraineeListPaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatPaginatorModule,
        NgxsModule.forRoot([TraineesState]),
        HttpClientTestingModule
      ],
      declarations: [TraineeListPaginatorComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    store = TestBed.inject(Store);
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

    component.paginateTrainees(mockPageEvent);

    expect(store.dispatch).toHaveBeenCalledTimes(3);
    expect(store.dispatch).toHaveBeenCalledWith(
      new PaginateTrainees(mockPageEvent.pageIndex)
    );
    expect(store.dispatch).toHaveBeenCalledWith(new GetTrainees());
    expect(store.dispatch).toHaveBeenCalledWith(new UpdateTraineesRoute());
  });
});
