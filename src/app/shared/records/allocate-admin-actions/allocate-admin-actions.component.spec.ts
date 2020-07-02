import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule } from "@ngxs/store";
import { RecommendationsState } from "../../../recommendations/state/recommendations.state";

import { AllocateAdminActionsComponent } from "./allocate-admin-actions.component";

describe("AllocateAdminActionsComponent", () => {
  let component: AllocateAdminActionsComponent;
  let fixture: ComponentFixture<AllocateAdminActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllocateAdminActionsComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NgxsModule.forRoot([RecommendationsState])
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocateAdminActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
