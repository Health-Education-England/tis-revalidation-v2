import { CreateEditConcernResolver } from "./create-edit-concern.resolver";
import { Router } from "@angular/router";
import { Store, NgxsModule } from "@ngxs/store";
import { TestBed, async } from "@angular/core/testing";
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
import { defaultConcern } from "../constants";

describe("CreateEditConcernResolver", () => {
  let router: Router;
  let store: Store;
  let httpMock: HttpTestingController;
  const gmcNumber = 65477888;
  let req: TestRequest;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        NgxsModule.forRoot([ConcernState]),
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: "create",
            component: BlankComponent,
            resolve: { test: CreateEditConcernResolver }
          },
          {
            path: "edit/:concernId",
            component: BlankComponent,
            resolve: { test: CreateEditConcernResolver }
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
    router.initialNavigation();
  });

  it("should create an instance", () => {
    expect(new CreateEditConcernResolver(store, router)).toBeTruthy();
  });

  it("should create a default concern instance", async () => {
    req.flush(ConcernHistoryResponse1);
    await router.navigate(["create"]);
    const selectedConcern = store.selectSnapshot(ConcernState.selected);
    expect(selectedConcern).toEqual(defaultConcern);
  });

  it("should create a concern instance of id", async () => {
    req.flush(ConcernHistoryResponse2);
    const concernId = "xxxxxx-yyyyy-zzzzz";
    await router.navigate(["edit", concernId]);
    const selectedConcern = store.selectSnapshot(ConcernState.selected);
    expect(selectedConcern.concernId).toEqual(concernId);
  });

  it("should redirect to 404", async () => {
    req.flush(ConcernHistoryResponse2);
    const concernId = 1111;
    await router.navigate(["edit", concernId]);
    expect(router.url).toEqual("/404");
  });

  it("should redirect to 404 of create url is used to inject concernId", async () => {
    req.flush(ConcernHistoryResponse2);
    const concernId = 1111;
    await router.navigate(["create", concernId]);
    expect(router.url).toEqual("/404");
  });

  afterEach(() => {
    httpMock.verify();
  });
});
