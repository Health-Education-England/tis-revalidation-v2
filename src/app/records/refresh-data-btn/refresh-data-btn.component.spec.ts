import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule } from "@ngxs/store";
import { RecommendationsState } from "../../recommendations/state/recommendations.state";
import { MaterialModule } from "../../shared/material/material.module";
import { RecordsService } from "../services/records.service";

import { RefreshDataBtnComponent } from "./refresh-data-btn.component";

describe("RefreshDataBtnComponent", () => {
  let component: RefreshDataBtnComponent;
  let fixture: ComponentFixture<RefreshDataBtnComponent>;
  let recordsService: RecordsService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RefreshDataBtnComponent],
        imports: [
          HttpClientTestingModule,
          MaterialModule,
          RouterTestingModule,
          NgxsModule.forRoot([RecommendationsState])
        ]
      }).compileComponents();
      recordsService = TestBed.inject(RecordsService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RefreshDataBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("refreshData() should invoke `recordsService.get()`", () => {
    spyOn(recordsService, "get");
    component.refreshData();
    expect(recordsService.get).toHaveBeenCalled();
  });
});
