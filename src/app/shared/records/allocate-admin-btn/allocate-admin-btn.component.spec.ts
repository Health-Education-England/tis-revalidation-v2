import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule } from "@ngxs/store";
import { RecommendationsState } from "../../../recommendations/state/recommendations.state";

import { AllocateAdminBtnComponent } from "./allocate-admin-btn.component";

describe("AllocateAdminBtnComponent", () => {
  let component: AllocateAdminBtnComponent;
  let fixture: ComponentFixture<AllocateAdminBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllocateAdminBtnComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NgxsModule.forRoot([RecommendationsState])
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocateAdminBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
