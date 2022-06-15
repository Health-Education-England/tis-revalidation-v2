import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { NgxsModule } from "@ngxs/store";
import { RecommendationHistoryState } from "../state/recommendation-history.state";

import { RecommendationNotesComponent } from "./recommendation-notes.component";
import { MaterialModule } from "src/app/shared/material/material.module";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { RouterTestingModule } from "@angular/router/testing";

describe("RecommendationNotesComponent", () => {
  let component: RecommendationNotesComponent;
  let fixture: ComponentFixture<RecommendationNotesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MaterialModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NgxsModule.forRoot([RecommendationHistoryState])
      ],
      declarations: [RecommendationNotesComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: MatBottomSheetRef, useValue: {} }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
