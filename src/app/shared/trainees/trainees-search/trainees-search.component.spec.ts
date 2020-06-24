import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TraineesSearchComponent } from "./trainees-search.component";
import { RouterTestingModule } from "@angular/router/testing";
import { TraineesService } from "../trainees.service";
import { MaterialModule } from "../../material/material.module";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe("TraineesSearchComponent", () => {
  let component: TraineesSearchComponent;
  let fixture: ComponentFixture<TraineesSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MaterialModule, NoopAnimationsModule],
      declarations: [TraineesSearchComponent],
      providers: [TraineesService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
