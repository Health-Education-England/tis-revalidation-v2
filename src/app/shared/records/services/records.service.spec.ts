import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { environment } from "@environment";
import { Observable, of } from "rxjs";
import { mockTraineesResponse } from "../../../trainees/services/trainees.service.spec";

import { RecordsService } from "./records.service";

export class MockRecordsService {
  public getRecords(): Observable<any> {
    return of(mockTraineesResponse);
  }
}

describe("RecordsService", () => {
  let service: RecordsService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule]
    });
    service = TestBed.inject(RecordsService);
    http = TestBed.inject(HttpTestingController);
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
});
