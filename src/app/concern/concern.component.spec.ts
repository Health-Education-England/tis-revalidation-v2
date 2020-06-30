import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ConcernComponent } from "./concern.component";
import { NgxsModule } from "@ngxs/store";
import { ConcernState } from "./state/concern.state";
import { ConcernService } from "./service/concern.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MaterialModule } from "../shared/material/material.module";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";

describe("ConcernComponent", () => {
  let component: ConcernComponent;
  let fixture: ComponentFixture<ConcernComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([ConcernState]),
        HttpClientTestingModule,
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule
      ],
      providers: [ConcernService],
      declarations: [ConcernComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
