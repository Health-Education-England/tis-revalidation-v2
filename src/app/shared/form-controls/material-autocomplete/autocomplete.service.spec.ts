import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { AutocompleteService } from "./autocomplete.service";
import { NgxsModule, Store } from "@ngxs/store";
import { AdminsState } from "src/app/admins/state/admins.state";
import { MaterialModule } from "../../material/material.module";

describe("AutocompleteService", () => {
  let service: AutocompleteService;
  let store: Store;
  let httpTestingController: HttpTestingController;
  const options: string[] = ["apple", "banana", "cherry"];
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutocompleteService],
      imports: [
        HttpClientTestingModule,
        NgxsModule.forRoot([AdminsState]),
        MaterialModule
      ]
    });
    store = TestBed.inject(Store);
    service = TestBed.inject(AutocompleteService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it("should call correct endpoint when calling getItems()", () => {
    service.getItems("programmeName", "query").subscribe();
    const request = httpTestingController.expectOne(
      "api/v1/doctors/autocomplete?fieldName=programmeName&input=query&dbcs="
    );
    request.flush(options);
    expect(request.request.method).toBe("GET");
  });

  it("should return expected data when calling filterItems()", () => {
    const items = ["Dixon Bainbridge", "Bob Fossil", "Howard Moon"];
    service.filterItems("how", items).subscribe((matches) => {
      expect(matches.includes("Howard Moon")).toBeTrue();
    });
  });

  it("should return expected data when calling getAdmins()", () => {
    store.reset({
      admins: {
        items: [
          {
            fullName: "Bob Fossil",
            email: "bob.fossil@hee.nhs.uk",
            username: "bob.fossil@hee.nhs.uk"
          },
          {
            fullName: "Dixon Bainbridge",
            email: "dixon.bainbridge@hee.nhs.uk",
            username: "dixon.bainbridge@hee.nhs.uk"
          },
          {
            fullName: "Howard Moon",
            email: "howard.moon@hee.nhs.uk",
            username: "howard.moon@@hee.nhs.uk"
          }
        ]
      }
    });
    service.getAdmins({ query: "how" }).subscribe((matches) => {
      expect(matches.includes("Howard Moon")).toBeTrue();
    });
  });
});
