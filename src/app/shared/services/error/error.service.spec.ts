import { HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { ErrorService } from "./error.service";

describe("ErrorService", () => {
  let service: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should return appropriate client side error message", () => {
    const error: HttpErrorResponse = new HttpErrorResponse({
      error: new ErrorEvent("error", { message: "There has been an error" })
    });
    const message: string = service.generateErrorMsg(error);
    expect(message).toBeInstanceOf(String);
    expect(message).toEqual(`Error: ${error.error.message}`);
  });

  it("should return appropriate server side error message", () => {
    const error: HttpErrorResponse = new HttpErrorResponse({
      status: 400,
      statusText: `Not found`
    });
    const message: string = service.generateErrorMsg(error);
    expect(message).toBeInstanceOf(String);
    expect(message).toEqual(`Error Code: ${error.status}. ${error.statusText}`);
  });
});
