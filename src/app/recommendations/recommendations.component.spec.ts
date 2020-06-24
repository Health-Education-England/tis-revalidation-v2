import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "../shared/material/material.module";
import { RecommendationsComponent } from "./recommendations.component";
import { TraineesService } from "../shared/trainees/trainees.service";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule } from "@ngxs/store";
import { RecommendationsState } from "./state/recommendations.state";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("RecommendationsComponent", () => {
  let component: RecommendationsComponent;
  let fixture: ComponentFixture<RecommendationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([RecommendationsState])
      ],
      declarations: [RecommendationsComponent],
      providers: [TraineesService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
