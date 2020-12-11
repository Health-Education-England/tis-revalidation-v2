import { TestBed, async } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { Component } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { ConnectionResolver } from "./connection.resolver";
import { MaterialModule } from "../shared/material/material.module";
import { ConnectionState } from "./state/connection.state";
import { Get } from "./state/connection.actions";
import { mockConnectionResponse } from "./mock-data/conneciton-details-spec-data";

@Component({
  template: `blank`
})
export class BlankComponent {}

describe("ConnectionResolver", () => {
  let router: Router;
  let store: Store;
  let resolver: ConnectionResolver;

  beforeEach(async(() => {
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
    router = TestBed.inject(Router);
    resolver = new ConnectionResolver(store, router);
  }));

  it("should create an instance", () => {
    expect(resolver).toBeTruthy();
  });

  it("should call store.dispatch with new Get", () => {
    const route = new ActivatedRouteSnapshot();
    route.params = {
      gmcNumber: mockConnectionResponse.programme.gmcNumber
    };

    spyOn(store, "dispatch").and.callThrough();
    resolver.resolve(route);
    expect(store.dispatch).toHaveBeenCalledWith(
      new Get(mockConnectionResponse.programme.gmcNumber)
    );
  });
});
