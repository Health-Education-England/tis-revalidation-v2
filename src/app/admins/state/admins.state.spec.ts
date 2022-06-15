import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TestBed, waitForAsync } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { MaterialModule } from "../../shared/material/material.module";
import { AdminsService } from "../services/admins.service";
import { mockAdminsResponse } from "../services/admins.service.spec";
import { Get, GetError, GetSuccess } from "./admins.actions";
import { AdminsState } from "./admins.state";
import { of } from "rxjs";

describe("Admins state", () => {
  let store: Store;
  let adminsService: AdminsService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        RouterTestingModule,
        NoopAnimationsModule,
        NgxsModule.forRoot([AdminsState]),
        HttpClientTestingModule
      ],
      providers: [AdminsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    store = TestBed.inject(Store);
    adminsService = TestBed.inject(AdminsService);
  }));

  it("should select 'AdminsState'", () => {
    const state = store.selectSnapshot(AdminsState);
    expect(state).toBeTruthy();
  });

  it("should dispatch 'Get' and invoke `adminsService.getAdminUsers()`", async () => {
    spyOn(adminsService, "getAdminUsers").and.returnValues(
      of(mockAdminsResponse)
    );
    await store.dispatch(new Get()).toPromise();
    expect(adminsService.getAdminUsers).toHaveBeenCalled();
  });

  it("should dispatch 'GetSuccess' and select 'items' slice", async () => {
    await store.dispatch(new GetSuccess(mockAdminsResponse)).toPromise();
    const items = store.selectSnapshot(AdminsState.items);
    expect(items.length).toEqual(2);
    expect(items[0].email).toEqual("siteadmin@hee.nhs.uk");
  });

  it("should dispatch 'GetError' and select 'error' slice", async () => {
    const errorMsg = `Error: Missing credentials in config, if using AWS_CONFIG_FILE, set AWS_SDK_LOAD_CONFIG=1`;
    await store.dispatch(new GetError(errorMsg)).toPromise();
    const error = store.selectSnapshot(AdminsState.error);
    expect(error).toEqual(errorMsg);
  });
});
