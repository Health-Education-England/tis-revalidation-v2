import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MaterialModule } from "../../material/material.module";

import { RecordDetailsComponent } from "./record-details.component";

describe("RecordDetailsComponent", () => {
  let component: RecordDetailsComponent;
  let fixture: ComponentFixture<RecordDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecordDetailsComponent],
      imports: [MaterialModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
