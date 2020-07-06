import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CreateConcernComponent } from "./create-concern.component";
import { NgxsModule } from "@ngxs/store";
import { ConcernState } from "../state/concern.state";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MaterialModule } from "src/app/shared/material/material.module";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";

describe("CreateConcernComponent", () => {
  let component: CreateConcernComponent;
  let fixture: ComponentFixture<CreateConcernComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateConcernComponent],
      imports: [
        NgxsModule.forRoot([ConcernState]),
        HttpClientTestingModule,
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateConcernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
