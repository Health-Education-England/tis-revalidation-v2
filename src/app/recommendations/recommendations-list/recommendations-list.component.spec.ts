import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule } from "@ngxs/store";
import { MaterialModule } from "../../shared/material/material.module";
import { RecommendationsState } from "../state/recommendations.state";
import { RecommendationsListComponent } from "./recommendations-list.component";

describe("RecommendationsListComponent", () => {
  let component: RecommendationsListComponent;
  let fixture: ComponentFixture<RecommendationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecommendationsListComponent],
      imports: [
        RouterTestingModule,
        NgxsModule.forRoot([RecommendationsState]),
        HttpClientTestingModule,
        MaterialModule,
        NoopAnimationsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
