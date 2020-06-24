import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ConcernsComponent } from "./concerns.component";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule } from "@ngxs/store";
import { ConcernsState } from "./state/concerns.state";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("ConcernsComponent", () => {
  let component: ConcernsComponent;
  let fixture: ComponentFixture<ConcernsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgxsModule.forRoot([ConcernsState]),
        HttpClientTestingModule
      ],
      declarations: [ConcernsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcernsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
