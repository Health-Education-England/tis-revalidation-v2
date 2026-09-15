import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { NgxsModule } from "@ngxs/store";
import { RecommendationNotesState } from "../../recommendation/state/recommendation-notes.state";
import { MaterialModule } from "../../shared/material/material.module";

import { NotesToolBarComponent } from "./notes-tool-bar.component";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

describe("NotesToolBarComponent", () => {
  let component: NotesToolBarComponent;
  let fixture: ComponentFixture<NotesToolBarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [NotesToolBarComponent],
    imports: [MaterialModule,
        NoopAnimationsModule,
        NgxsModule.forRoot([RecommendationNotesState])],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
