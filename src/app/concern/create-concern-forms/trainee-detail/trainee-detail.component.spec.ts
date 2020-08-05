import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { NgxsModule, Store } from "@ngxs/store";
import { AdminsState } from "../../../admins/state/admins.state";
import { MaterialModule } from "../../../shared/material/material.module";
import { ConcernState } from "../../state/concern.state";

import { TraineeDetailComponent } from "./trainee-detail.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AdminsModule } from "src/app/admins/admins.module";
import { SetSelectedConcern } from "../../state/concern.actions";
import { defaultConcern } from "../../constants";

describe("TraineeDetailComponent", () => {
  let component: TraineeDetailComponent;
  let fixture: ComponentFixture<TraineeDetailComponent>;
  let store: Store;
  const setDefaultSelectedConcern = () => {
    store.dispatch(new SetSelectedConcern(defaultConcern));
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TraineeDetailComponent],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        AdminsModule,
        NgxsModule.forRoot([ConcernState, AdminsState])
      ]
    }).compileComponents();
    store = TestBed.inject(Store);
    setDefaultSelectedConcern();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
