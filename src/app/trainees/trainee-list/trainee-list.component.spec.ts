import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { GetTrainees } from "../state/trainees.actions";
import { TraineesState } from "../state/trainees.state";
import { TraineeListComponent } from "./trainee-list.component";
import { RouterTestingModule } from "@angular/router/testing";

describe("UnderNoticeComponent", () => {
  let store: Store;
  let component: TraineeListComponent;
  let fixture: ComponentFixture<TraineeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TraineeListComponent],
      imports: [
        RouterTestingModule,
        NgxsModule.forRoot([TraineesState]),
        HttpClientTestingModule
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

  it("should dispatch 'GetTrainees' on init", () => {
    spyOn(store, "dispatch");
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(new GetTrainees());
  });
});
