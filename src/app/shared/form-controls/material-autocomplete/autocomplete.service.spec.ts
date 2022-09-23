import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { AutocompleteService } from "./autocomplete.service";

describe("AutocompleteService", () => {
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
    service.getItems("programmeName", "query").subscribe();
    const request = httpTestingController.expectOne(
      "api/v1/doctors/autocomplete?fieldName=programmeName&input=query&dbcs="
    );

    request.flush(options);
    expect(request.request.method).toBe("GET");
  });
});
