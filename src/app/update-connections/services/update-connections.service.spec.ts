import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { environment } from "@environment";
import { NgxsModule, Store } from "@ngxs/store";
import { EnableUpdateConnections } from "../state/update-connections.actions";
import { UpdateConnectionsState } from "../state/update-connections.state";
import { ActionType } from "../update-connections.interfaces";
import { UpdateConnectionsService } from "./update-connections.service";

describe("UpdateConnectionsService", () => {
  let service: UpdateConnectionsService;
  let http: HttpTestingController;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgxsModule.forRoot([UpdateConnectionsState])
      ]
    });
    service = TestBed.inject(UpdateConnectionsService);
    http = TestBed.inject(HttpTestingController);
    store = TestBed.inject(Store);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should dispatch EnableUpdateConnections action when enableUpdateConnections is invoked", () => {
    spyOn(store, "dispatch");

    service.enableUpdateConnections(false);
    expect(store.dispatch).toHaveBeenCalledWith(
      new EnableUpdateConnections(false)
    );
  });

  it("should add new connection", () => {
    const endPoint = `${environment.appUrls.getConnections}/add`;

    service.updateConnection({}, ActionType.ADD_CONNECTION).subscribe();

    const mockHttp = http.expectOne(endPoint);
    expect(mockHttp.request.method).toBe("POST");

    http.verify();
  });

  it("should remove current connection", () => {
    const endPoint = `${environment.appUrls.getConnections}/remove`;

    service.updateConnection({}, ActionType.REMOVE_CONNECTION).subscribe();

    const mockHttp = http.expectOne(endPoint);
    expect(mockHttp.request.method).toBe("POST");

    http.verify();
  });

  it("should hide selected connection", () => {
    const endPoint = `${environment.appUrls.getConnections}/hide`;

    service.updateConnection({}, ActionType.HIDE_CONNECTION).subscribe();

    const mockHttp = http.expectOne(endPoint);
    expect(mockHttp.request.method).toBe("POST");

    http.verify();
  });

  it("should unhide selected connection", () => {
    const endPoint = `${environment.appUrls.getConnections}/unhide`;

    service.updateConnection({}, ActionType.UNHIDE_CONNECTION).subscribe();

    const mockHttp = http.expectOne(endPoint);
    expect(mockHttp.request.method).toBe("POST");

    http.verify();
  });

  it("should throw error when add/remove connection api call fail", () => {
    let response: any;
    let errResponse: any;
    const mockErrorResponse = { status: 400, statusText: "Bad Request" };
    const data = "Invalid request parameters";

    service.updateConnection({}, ActionType.REMOVE_CONNECTION).subscribe(
      (res) => (response = res),
      (err) => (errResponse = err)
    );
    http
      .expectOne(`${environment.appUrls.getConnections}/remove`)
      .flush(data, mockErrorResponse);

    expect(errResponse.error).toBe(data);
  });
});
