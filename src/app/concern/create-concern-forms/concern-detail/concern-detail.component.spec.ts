import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ConcernDetailComponent } from "./concern-detail.component";
import { NgxsModule } from "@ngxs/store";
import { ConcernState } from "../../state/concern.state";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MaterialModule } from "src/app/shared/material/material.module";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";

describe("ConcernDetailComponent", () => {
  let component: ConcernDetailComponent;
  let fixture: ComponentFixture<ConcernDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConcernDetailComponent],
      imports: [
        NgxsModule.forRoot([ConcernState]),
        HttpClientTestingModule,
        MaterialModule,
        NoopAnimationsModule,
        ReactiveFormsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcernDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
