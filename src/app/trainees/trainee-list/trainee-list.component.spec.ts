import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { MaterialModule } from "../../shared/material/material.module";
import { Filter } from "../state/trainees.actions";
import { TraineesState } from "../state/trainees.state";
import { TraineesFilterType } from "../trainees.interfaces";
import { TraineeListComponent } from "./trainee-list.component";

describe("TraineeListComponent", () => {
  let store: Store;
  let component: TraineeListComponent;
  let fixture: ComponentFixture<TraineeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TraineeListComponent],
      imports: [
        RouterTestingModule,
        NgxsModule.forRoot([TraineesState]),
        HttpClientTestingModule,
        MaterialModule,
        NoopAnimationsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    store = TestBed.inject(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("'setupInitialFilter()' should dispatch 'AllDoctorsFilter' if param value is `allDoctors`", () => {
    spyOn(store, "dispatch");

    component.params = { filter: TraineesFilterType.ALL_DOCTORS };
    component.ngOnInit();

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      new Filter(TraineesFilterType.ALL_DOCTORS)
    );
    expect(store.dispatch).not.toHaveBeenCalledWith(
      new Filter(TraineesFilterType.UNDER_NOTICE)
    );
  });

  it("'setupInitialFilter()' should dispatch 'UnderNoticeFilter' if param does not exist", () => {
    spyOn(store, "dispatch");

    component.ngOnInit();

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      new Filter(TraineesFilterType.UNDER_NOTICE)
    );
    expect(store.dispatch).not.toHaveBeenCalledWith(
      new Filter(TraineesFilterType.ALL_DOCTORS)
    );
  });
});
