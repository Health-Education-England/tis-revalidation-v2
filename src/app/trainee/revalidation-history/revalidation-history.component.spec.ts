import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";

import { RevalidationHistoryComponent } from "./revalidation-history.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "src/app/shared/material/material.module";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule } from "@ngxs/store";
import { RevalidationHistoryState } from "../state/revalidation-history.state";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("RevalidationHistoryComponent", () => {
  let component: RevalidationHistoryComponent;
  let fixture: ComponentFixture<RevalidationHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MaterialModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatTableModule,
        MatSortModule,
        NgxsModule.forRoot([RevalidationHistoryState])
      ],
      declarations: [RevalidationHistoryComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevalidationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
