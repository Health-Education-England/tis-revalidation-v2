import { TestBed } from "@angular/core/testing";

import { UtilitiesService } from "./utilities.service";
import { AuthService } from "src/app/core/auth/auth.service";
import { IMenuItem } from "../../main-navigation/mat-main-nav/menu-item.interface";

class AuthServiceStub {
  public isRevalBeta = false;
}
describe("UtilitiesService", () => {
  let service: UtilitiesService;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UtilitiesService,
        { provide: AuthService, useClass: AuthServiceStub }
      ]
    });
    service = TestBed.inject(UtilitiesService);
    authService = TestBed.inject(AuthService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should return 'past' when a past date is passed.", () => {
    const pastDate = new Date("2000-01-01");
    expect(service.getDueDateStatus(pastDate)).toContain("past");
  });

  it("should return 'future' when a future date is passed.", () => {
    const futureDate = new Date("2200-01-01");
    expect(service.getDueDateStatus(futureDate)).toContain("future");
  });

  it("should return 'warning' when a future date less than 14 days is passed.", () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    expect(service.getDueDateStatus(today)).toContain("warning");
  });

  it("should return 'warning' when a future date less than custom  value is passed.", () => {
    const today = new Date();
    today.setDate(today.getDate() + 90);
    expect(service.getDueDateStatus(today, 100)).toContain("warning");
  });

  it("should return true when no environment or beta restrictions", () => {
    const menuItem: IMenuItem = {
      type: 0,
      route: "/connections",
      name: "Connections"
    };
    expect(service.showNavigationLink(menuItem)).toBeTrue();
  });

  it("should return false when link is in 'beta' but admin does not have 'RevalBeta' permissions", () => {
    const menuItem: IMenuItem = {
      type: 0,
      route: "/connections",
      name: "Connections",
      beta: true
    };
    authService.isRevalBeta = false;
    expect(service.showNavigationLink(menuItem)).toBeFalse();
  });

  it("should return true when link is in 'beta' and admin does have 'RevalBeta' permissions", () => {
    const menuItem: IMenuItem = {
      type: 0,
      route: "/connections",
      name: "Connections",
      beta: true
    };
    authService.isRevalBeta = true;
    expect(service.showNavigationLink(menuItem)).toBeTrue();
  });
});
