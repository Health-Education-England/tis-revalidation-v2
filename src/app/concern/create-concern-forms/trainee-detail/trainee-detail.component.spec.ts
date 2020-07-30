import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TraineeDetailComponent } from "./trainee-detail.component";

describe("TraineeDetailComponent", () => {
  let component: TraineeDetailComponent;
  let fixture: ComponentFixture<TraineeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TraineeDetailComponent]
    }).compileComponents();
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
