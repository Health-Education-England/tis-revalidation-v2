import { TestBed, waitForAsync } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { Component } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { ConnectionResolver } from "./connection.resolver";
import { MaterialModule } from "../shared/material/material.module";
import { ConnectionState } from "./state/connection.state";
import { Get } from "./state/connection.actions";
import { RecordsService } from "../records/services/records.service";

@Component({
  template: `blank`
})
export class BlankComponent {}

describe("ConnectionResolver", () => {
  let router: Router;
  let store: Store;
  let resolver: ConnectionResolver;
  let service: RecordsService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        NgxsModule.forRoot([ConnectionState]),
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: "", component: BlankComponent }
        ])
      ]
    }).compileComponents();

    store = TestBed.inject(Store);
    service = TestBed.inject(RecordsService);
    router = TestBed.inject(Router);
    resolver = new ConnectionResolver(store, router, service);
  }));

  it("should create an instance", () => {
    expect(resolver).toBeTruthy();
  });

  it("should call store.dispatch with new Get", () => {
    const gmcNumber = 1234567;
    const route = new ActivatedRouteSnapshot();
    route.params = {
      gmcNumber
    };

    spyOn(store, "dispatch").and.callThrough();
    resolver.resolve(route);
    expect(store.dispatch).toHaveBeenCalledWith(new Get(gmcNumber));
  });
});
