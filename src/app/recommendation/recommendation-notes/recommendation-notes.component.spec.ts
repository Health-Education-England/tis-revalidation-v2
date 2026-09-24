import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { NgxsModule } from "@ngxs/store";
import { RecommendationHistoryState } from "../state/recommendation-history.state";

import { RecommendationNotesComponent } from "./recommendation-notes.component";
import { MaterialModule } from "src/app/shared/material/material.module";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { RouterTestingModule } from "@angular/router/testing";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

describe("RecommendationNotesComponent", () => {
  let component: RecommendationNotesComponent;
  let fixture: ComponentFixture<RecommendationNotesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [RecommendationNotesComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [NoopAnimationsModule,
        MaterialModule,
        RouterTestingModule,
        NgxsModule.forRoot([RecommendationHistoryState])],
    providers: [{ provide: MatBottomSheetRef, useValue: {} }, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
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
