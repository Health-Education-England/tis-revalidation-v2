import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { AutocompleteService } from "./autocomplete.service";
import { isEmpty } from "rxjs/operators";

fdescribe("AutocompleteService", () => {
  let service: AutocompleteService;
  let httpTestingController: HttpTestingController;
  const options: string[] = ["apple", "banana", "cherry"];
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutocompleteService],
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(AutocompleteService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it("should call correct endpoint", () => {
    service.getData("query", "loadMovies").subscribe();
    const request = httpTestingController.expectOne(
      "nymovies?api-key=GyIcunqNC1k86GYGU21QAUTdESGlGUOP&query=query"
    );

    request.flush(options);
    expect(request.request.method).toBe("GET");
  });

  it("should call no endpoint when invalid method name passed", (done: DoneFn) => {
    service
      .getData("query", "NoMethod")
      .pipe(isEmpty())
      .subscribe((response) => {
        expect(response).toEqual(true);
        done();
      });
  });
});
