import { AdminsPipe } from "./admins.pipe";
import { Store, NgxsModule } from "@ngxs/store";
import { TestBed, async } from "@angular/core/testing";

describe("AdminsPipe", () => {
  let store: Store;
  let pipe: AdminsPipe;
  const adminsList = {
    items: [
      { username: "user1@hee.nhs.uk", fullName: "Demo1 User" },
      { username: "user2@hee.nhs.uk", fullName: "Demo2 User" }
    ]
  };

  const emptyList = { items: [] };

  const nullList = { items: null };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot()]
    });
    store = TestBed.inject(Store);
  }));

  describe("when admin store has a list of admins", () => {
    beforeEach(() => {
      spyOn(store, "selectSnapshot").and.returnValue(adminsList);
      pipe = new AdminsPipe(store);
    });

    it("should expect pipe", () => {
      expect(pipe).toBeTruthy();
    });

    it("should return empty string when null, or '' or undefined ", () => {
      expect(pipe.transform("")).toEqual("");
      expect(pipe.transform(null)).toEqual("");
      expect(pipe.transform(undefined)).toEqual("");
    });

    it("should return full name of users", () => {
      expect(pipe.transform("user1@hee.nhs.uk")).toEqual("Demo1 User");
      expect(pipe.transform("user2@hee.nhs.uk")).toEqual("Demo2 User");
    });
  });

  describe("when admin store has an empty list of admins", () => {
    beforeEach(() => {
      spyOn(store, "selectSnapshot").and.returnValue(emptyList);
      pipe = new AdminsPipe(store);
    });

    it("should expect pipe", () => {
      expect(pipe).toBeTruthy();
    });

    it("should return empty string when null, or '' or undefined ", () => {
      expect(pipe.transform("")).toEqual("");
      expect(pipe.transform(null)).toEqual("");
      expect(pipe.transform(undefined)).toEqual("");
    });

    it("should return full name of users", () => {
      expect(pipe.transform("user1@hee.nhs.uk")).toEqual("user1@hee.nhs.uk");
      expect(pipe.transform("user2@hee.nhs.uk")).toEqual("user2@hee.nhs.uk");
    });
  });

  describe("when admin store list is null", () => {
    beforeEach(() => {
      spyOn(store, "selectSnapshot").and.returnValue(nullList);
      pipe = new AdminsPipe(store);
    });

    it("should expect pipe", () => {
      expect(pipe).toBeTruthy();
    });

    it("should return empty string when null, or '' or undefined ", () => {
      expect(pipe.transform("")).toEqual("");
      expect(pipe.transform(null)).toEqual("");
      expect(pipe.transform(undefined)).toEqual("");
    });

    it("should return full name of users", () => {
      expect(pipe.transform("user1@hee.nhs.uk")).toEqual("user1@hee.nhs.uk");
      expect(pipe.transform("user2@hee.nhs.uk")).toEqual("user2@hee.nhs.uk");
    });
  });
});
