import { AdminsPipe } from "./admins.pipe";
import { Store, NgxsModule } from "@ngxs/store";
import { TestBed, waitForAsync } from "@angular/core/testing";

describe("AdminsPipe", () => {
  let store: Store;
  let pipe: AdminsPipe;
  const user1 = {
    username: "66596851-3b8a-0009",
    fullName: "Demo1 User",
    email: "user1@hee.nhs.uk"
  };
  const user2 = {
    username: "b0737686-1aee-4070",
    fullName: "Demo2 User",
    email: "user2@hee.nhs.uk"
  };
  const adminsList = {
    items: [user2, user1]
  };

  const emptyList = { items: [] };

  const nullList = { items: null };

  beforeEach(waitForAsync(() => {
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
      expect(pipe.transform(user1.username)).toEqual(user1.fullName);
      expect(pipe.transform(user2.username)).toEqual(user2.fullName);
    });
    it("should return email of users", () => {
      expect(pipe.transform(user1.username, "email")).toEqual(user1.email);
      expect(pipe.transform(user2.username, "email")).toEqual(user2.email);
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

    it("should return same string passed if store is empty", () => {
      expect(pipe.transform(user1.username)).toEqual(user1.username);
      expect(pipe.transform(user2.username)).toEqual(user2.username);
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
      expect(pipe.transform(user1.username)).toEqual(user1.username);
      expect(pipe.transform(user2.username)).toEqual(user2.username);
    });
  });
});
