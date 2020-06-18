import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RecommendationHistoryComponent } from "./recommendation-history.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "src/app/shared/material/material.module";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule } from "@ngxs/store";
import { RecommendationHistoryState } from "../state/recommendation-history.state";
import { HttpClientTestingModule } from "@angular/common/http/testing";

xdescribe("RecommendationHistoryComponent", () => {
  let component: RecommendationHistoryComponent;
  let fixture: ComponentFixture<RecommendationHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MaterialModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([RecommendationHistoryState])
      ],
      declarations: [RecommendationHistoryComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
