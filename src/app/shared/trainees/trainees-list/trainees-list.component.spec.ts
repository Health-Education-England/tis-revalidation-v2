import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TraineesListComponent } from "./trainees-list.component";
import { RouterTestingModule } from "@angular/router/testing";
import { TraineesService } from "../trainees.service";

describe("TraineesListComponent", () => {
  let component: TraineesListComponent;
  let fixture: ComponentFixture<TraineesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [TraineesListComponent],
      providers: [TraineesService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
