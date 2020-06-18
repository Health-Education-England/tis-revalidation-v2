import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MaterialModule } from "../../material/material.module";

import { RecordDetailsComponent } from "./record-details.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("RecordDetailsComponent", () => {
  let component: RecordDetailsComponent;
  let fixture: ComponentFixture<RecordDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecordDetailsComponent],
      imports: [MaterialModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
