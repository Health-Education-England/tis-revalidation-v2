import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { environment } from "@environment";
import { NgxsModule, Store } from "@ngxs/store";
import {
  TraineesState,
  TraineesStateModel
} from "../../../trainees/state/trainees.state";

import { RecordsService } from "./records.service";

describe("RecordsService", () => {
  let service: RecordsService;
  let http: HttpTestingController;
  let router: Router;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([TraineesState])
      ]
    });
    service = TestBed.inject(RecordsService);
    http = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    store = TestBed.inject(Store);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("`getRecords()` should call api", () => {
    const endPoint = `${environment.appUrls.getTrainees}`;
    service.getRecords(endPoint).subscribe();

    const mockHttp = http.expectOne(endPoint);
    expect(mockHttp.request.method).toBe("GET");

    http.verify();
  });

  it("`updateRoute()` should invoke router navigation", () => {
    spyOn(router, "navigate");

    const snapshot: TraineesStateModel = store.snapshot().trainees;
    const routeName = "trainees";
    service.updateRoute(routeName);

    expect(router.navigate).toHaveBeenCalledWith([routeName], {
      queryParams: {
        active: snapshot.sort.active,
        direction: snapshot.sort.direction,
        pageIndex: snapshot.pageIndex,
        filter: snapshot.filter,
        ...(snapshot.searchQuery && { searchQuery: snapshot.searchQuery })
      }
    });
  });
});
