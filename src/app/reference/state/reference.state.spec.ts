import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TestBed, waitForAsync } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { MaterialModule } from "../../shared/material/material.module";
import { ReferenceService } from "../services/reference.service";
import { GetDesignatedBodies, GetError, GetSuccess } from "./reference.actions";
import { ReferenceState } from "./reference.state";
import { of } from "rxjs";
import { mockDbcs } from "../mock-data/reference-spec.data";

describe("Reference state", () => {
  let store: Store;
  let referenceService: ReferenceService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        RouterTestingModule,
        NoopAnimationsModule,
        NgxsModule.forRoot([ReferenceState]),
        HttpClientTestingModule
      ],
      providers: [ReferenceService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    store = TestBed.inject(Store);
    referenceService = TestBed.inject(ReferenceService);
  }));

  it("should select 'ReferenceState'", () => {
    const state = store.selectSnapshot(ReferenceState);
    expect(state).toBeTruthy();
  });

  it("should dispatch 'GetDesignatedBodies' and invoke `referenceService.getDbcs()`", async () => {
    spyOn(referenceService, "getDbcs").and.returnValues(of(mockDbcs));
    await store.dispatch(new GetDesignatedBodies()).toPromise();
    expect(referenceService.getDbcs).toHaveBeenCalled();
  });

  it("should dispatch 'GetSuccess' and select 'dbcs' slice", async () => {
    await store.dispatch(new GetSuccess(mockDbcs)).toPromise();
    const items = store.selectSnapshot(ReferenceState.Dbcs);
    expect(items.length).toEqual(mockDbcs.length);
    expect(items[0].dbc).toEqual("1-AIIDWT");
  });

  it("should dispatch 'GetError' and select 'error' slice", async () => {
    const errorMsg = `Error`;
    await store.dispatch(new GetError(errorMsg)).toPromise();
    const error = store.selectSnapshot(ReferenceState.error);
    expect(error).toEqual(errorMsg);
  });
});
