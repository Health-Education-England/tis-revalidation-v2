import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TraineesFilterComponent } from "./trainees-filter.component";
import { RouterTestingModule } from "@angular/router/testing";
import { TraineesService } from "../trainees.service";

describe("TraineesFilterComponent", () => {
  let component: TraineesFilterComponent;
  let fixture: ComponentFixture<TraineesFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [TraineesFilterComponent],
      providers: [TraineesService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
