import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { MaterialModule } from "../../shared/material/material.module";
import { RecommendationsState } from "./recommendations.state";
import { RecommendationsService } from "../services/recommendations.service";

describe("Recommendations state", () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([RecommendationsState]),
        HttpClientTestingModule,
        RouterTestingModule,
        MaterialModule
      ],
      providers: [RecommendationsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    store = TestBed.inject(Store);
  }));

  it("should select 'RecommendationsState'", () => {
    const state = store.selectSnapshot(RecommendationsState);
    expect(state).toBeTruthy();
  });
});
