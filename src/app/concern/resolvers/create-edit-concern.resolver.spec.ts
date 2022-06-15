import { CreateEditConcernResolver } from "./create-edit-concern.resolver";
import { Router } from "@angular/router";
import { Store, NgxsModule } from "@ngxs/store";
import { TestBed, waitForAsync } from "@angular/core/testing";
import { MaterialModule } from "src/app/shared/material/material.module";
import { ConcernState } from "../state/concern.state";
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest
} from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { BlankComponent } from "./concern.resolver.spec";
import { environment } from "@environment";
import { Get } from "../state/concern.actions";
import {
  ConcernHistoryResponse1,
  ConcernHistoryResponse2
} from "src/app/recommendation/mock-data/recommendation-spec-data";
import { NgZone } from "@angular/core";

describe("CreateEditConcernResolver", () => {
  let router: Router;
  let store: Store;
  let httpMock: HttpTestingController;
  const gmcNumber = 65477888;
  let req: TestRequest;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        NgxsModule.forRoot([ConcernState]),
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: ":gmcNumber",
            component: BlankComponent,
            runGuardsAndResolvers: "always",
            children: [
              {
                path: "create",
                component: BlankComponent,
                resolve: { test: CreateEditConcernResolver }
              },
              {
                path: "edit/:concernId",
                component: BlankComponent,
                resolve: { test: CreateEditConcernResolver }
              }
            ]
          },
          {
            path: "404",
            component: BlankComponent
          },
          {
            path: "**",
            redirectTo: "404"
          }
        ])
      ],
      providers: [CreateEditConcernResolver]
    }).compileComponents();
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    httpMock = TestBed.inject(HttpTestingController);
  }));

  beforeEach(() => {
    store.dispatch(new Get(gmcNumber));
    req = httpMock.expectOne(`${environment.appUrls.getConcern}/${gmcNumber}`);
    expect(req.request.method).toEqual("GET");
    new NgZone({}).run(() => {
      router.initialNavigation();
    });
  });

  it("should create an instance", () => {
    expect(new CreateEditConcernResolver(store, router)).toBeTruthy();
  });

  it("should create a default concern instance with gmcNumber", async () => {
    req.flush(ConcernHistoryResponse1);
    await new NgZone({}).run(() => router.navigate([`${gmcNumber}/create`]));
    const selectedConcern = store.selectSnapshot(ConcernState.selected);
    expect(selectedConcern.gmcNumber).toEqual(gmcNumber);
  });

  it("should create a concern instance of id", async () => {
    req.flush(ConcernHistoryResponse2);
    const concernId = "xxxxxx-yyyyy-zzzzz";

    await new NgZone({}).run(() =>
      router.navigate([`${gmcNumber}/edit`, concernId])
    );
    const selectedConcern = store.selectSnapshot(ConcernState.selected);
    expect(selectedConcern.concernId).toEqual(concernId);
  });

  it("should redirect to 404", async () => {
    req.flush(ConcernHistoryResponse2);
    const concernId = 1111;
    await new NgZone({}).run(() =>
      router.navigate([`${gmcNumber}/edit`, concernId])
    );
    expect(router.url).toEqual("/404");
  });

  it("should redirect to 404 of create url is used to inject concernId", async () => {
    req.flush(ConcernHistoryResponse2);
    const concernId = 1111;
    await new NgZone({}).run(() =>
      router.navigate([`${gmcNumber}/create`, concernId])
    );
    expect(router.url).toEqual("/404");
  });

  afterEach(() => {
    httpMock.verify();
  });
});
