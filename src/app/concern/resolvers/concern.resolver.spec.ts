import { ConcernResolver } from "./concern.resolver";
import { TestBed, waitForAsync } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { ConcernState } from "../state/concern.state";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MaterialModule } from "../../shared/material/material.module";

@Component({
  template: `blank`
})
export class BlankComponent {}

describe("ConcernResolver", () => {
  let router: Router;
  let store: Store;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          MaterialModule,
          NgxsModule.forRoot([ConcernState]),
          HttpClientTestingModule,
          RouterTestingModule.withRoutes([
            { path: "", component: BlankComponent }
          ])
        ]
      }).compileComponents();
      store = TestBed.inject(Store);
      router = TestBed.inject(Router);
    })
  );

  it("should create an instance", () => {
    expect(new ConcernResolver(store, router)).toBeTruthy();
  });
});
