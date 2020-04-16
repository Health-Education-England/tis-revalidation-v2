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
} from "../../trainees/state/trainees.state";
import { TraineeService } from "./trainee.service";

describe("TraineeService", () => {
  let service: TraineeService;
  let http: HttpTestingController;
  let router: Router;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NgxsModule.forRoot([TraineesState])
      ],
      providers: [TraineeService]
    });
    service = TestBed.inject(TraineeService);
    http = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    store = TestBed.inject(Store);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("`getTrainees()` should call api", () => {
    service.getTrainees().subscribe();

    const mockHttp = http.expectOne(`${environment.appUrls.getTrainees}`);
    expect(mockHttp.request.method).toBe("GET");

    http.verify();
  });

  it("`updateTraineesRoute()` should navigate to `/trainees`", () => {
    spyOn(router, "navigate");

    const snapshot: TraineesStateModel = store.snapshot().trainees;
    service.updateTraineesRoute();

    expect(router.navigate).toHaveBeenCalledWith(["/trainees"], {
      queryParams: {
        active: snapshot.sort.active,
        direction: snapshot.sort.direction,
        pageIndex: snapshot.pageIndex
      }
    });
  });
});
