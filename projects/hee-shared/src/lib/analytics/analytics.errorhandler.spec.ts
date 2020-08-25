import { AnalyticsErrorHandler } from "./analytics.errorhandler";
import { async, TestBed } from "@angular/core/testing";
import { ErrorHandler, Injector } from "@angular/core";
import { Angulartics2GoogleAnalytics } from "angulartics2/ga";

describe("AnalyticsErrorHandler", () => {
  let handler: ErrorHandler;
  let angulartics: Angulartics2GoogleAnalytics;
  let InjectorInstance: Injector;
  let angularticsSpy: jasmine.Spy<any>;
  let errorSpy: jasmine.Spy<any>;
  let error: Error;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        AnalyticsErrorHandler,
        {
          provide: Angulartics2GoogleAnalytics,
          useValue: {
            exceptionTrack: (_err: any) => {
              // console.info("mock-service-error:", error);
            }
          }
        }
      ]
    }).compileComponents();
    handler = TestBed.inject(AnalyticsErrorHandler);
    angulartics = TestBed.inject(Angulartics2GoogleAnalytics);
    InjectorInstance = TestBed.inject(Injector);
  }));

  beforeEach(() => {
    (window as any).ga = null;
    error = new Error("an error has occured");
    angularticsSpy = spyOn(angulartics, "exceptionTrack").and.callThrough();
    errorSpy = spyOn(
      AnalyticsErrorHandler.prototype,
      "handleError"
    ).and.callThrough();
  });

  it("Should proccess error where window.ga is defined", () => {
    (window as any).ga = [];

    expect(() => {
      handler.handleError(error);
    }).toThrowError(error.message);

    expect(errorSpy).toHaveBeenCalledWith(error);

    expect(angulartics.exceptionTrack).toHaveBeenCalled();

    expect(angulartics.exceptionTrack).toHaveBeenCalledWith({
      fatal: false,
      description: error.message
    });
  });

  it("Should skip sending to ga when null", () => {
    expect(() => {
      handler.handleError(error);
    }).toThrowError(error.message);

    expect(errorSpy).toHaveBeenCalledWith(error);

    expect(angulartics.exceptionTrack).not.toHaveBeenCalled();
  });

  it("Should proccess stacktrace where available and window.ga is defined", () => {
    (window as any).ga = [];
    error.message = null;
    error.stack = `Error: ERROR
    at UserContext.<anonymous> (http://localhost:9876/_karma_webpack_/src/lib/analytics/analytics.errorhandler.spec.ts:62:25)`;
    expect(() => {
      handler.handleError(error);
    }).toThrowError(error.message);

    expect(errorSpy).toHaveBeenCalledWith(error);

    expect(angulartics.exceptionTrack).toHaveBeenCalled();

    expect(angulartics.exceptionTrack).toHaveBeenCalledWith({
      fatal: false,
      description: error.stack
    });
  });

  it("Should proccess error object where available and window.ga is defined", () => {
    (window as any).ga = [];
    error.message = error.stack = null;
    error.name = "Just a simple error";

    expect(() => {
      handler.handleError(error);
    }).toThrowError(error.message);

    expect(errorSpy).toHaveBeenCalledWith(error);

    expect(angulartics.exceptionTrack).toHaveBeenCalled();

    expect(angulartics.exceptionTrack).toHaveBeenCalledWith({
      fatal: false,
      description: error
    });
  });
});
