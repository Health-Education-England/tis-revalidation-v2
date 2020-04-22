import { TraineeResolver } from "./trainee.resolver";
import { TestBed, async } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { RevalidationHistoryState } from "./state/revalidation-history.state";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RevalidationNotesState } from "./state/revalidation-notes.state";

@Component({
  template: `blank`
})
export class BlankComponent {}

describe("TraineeResolver", () => {
  let router: Router;
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([RevalidationHistoryState]),
        NgxsModule.forRoot([RevalidationNotesState]),
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: "", component: BlankComponent }
        ])
      ]
    }).compileComponents();
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
  }));

  it("should create an instance", () => {
    expect(new TraineeResolver(store, router)).toBeTruthy();
  });
});
