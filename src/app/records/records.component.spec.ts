import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { NgxsModule } from "@ngxs/store";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { RecordsComponent } from "./records.component";
import { MaterialModule } from "../shared/material/material.module";

describe("RecordsComponent", () => {
  let component: RecordsComponent;
  let fixture: ComponentFixture<RecordsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
        MaterialModule
      ],
      declarations: [RecordsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
