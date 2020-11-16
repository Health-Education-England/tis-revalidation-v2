import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { RecommendationsState } from "../../recommendations/state/recommendations.state";
import { RecordsService } from "../../records/services/records.service";

import { AllocateAdminBtnComponent } from "./allocate-admin-btn.component";

describe("AllocateAdminBtnComponent", () => {
  let store: Store;
  let component: AllocateAdminBtnComponent;
  let fixture: ComponentFixture<AllocateAdminBtnComponent>;
  let recordsService: RecordsService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AllocateAdminBtnComponent],
        imports: [
          HttpClientTestingModule,
          RouterTestingModule,
          NgxsModule.forRoot([RecommendationsState])
        ]
      }).compileComponents();
      store = TestBed.inject(Store);
      recordsService = TestBed.inject(RecordsService);

      store.reset({ recommendations: { enableAllocateAdmin: true } });
      recordsService.stateName = "recommendations";
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocateAdminBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should select 'enableAllocateAdmin$' from state", () => {
    component.enableAllocateAdmin$.subscribe((isEnabled: boolean) => {
      expect(isEnabled).toBeTruthy();
    });
  });

  it("should enable allocate admin mode", () => {
    spyOn(recordsService, "enableAllocateAdmin");
    component.enableAllocateAdmin();
    expect(recordsService.enableAllocateAdmin).toHaveBeenCalledWith(true);
  });

  it("should disable allocate admin mode", () => {
    spyOn(recordsService, "enableAllocateAdmin");
    component.disableAllocateAdmin();
    expect(recordsService.enableAllocateAdmin).toHaveBeenCalledWith(false);
  });
});
