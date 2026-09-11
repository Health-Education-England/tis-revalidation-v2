import { TestBed } from "@angular/core/testing";

import { UtilitiesService } from "./utilities.service";
import { AuthService } from "src/app/core/auth/auth.service";
import {
  IMenuItem,
  MenuType
} from "../../main-navigation/mat-main-nav/menu-item.interface";

class AuthServiceStub {
  public isRevalBeta = false;
  public roles: string[] = [];
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
      type: MenuType.INTERNAL,
      route: "/connections",
      name: "Connections"
    };
    expect(service.showNavigationLink(menuItem)).toBeTrue();
  });

  it("should return false when link is in 'beta' but admin does not have 'RevalBeta' permissions", () => {
    const menuItem: IMenuItem = {
      type: MenuType.INTERNAL,
      route: "/connections",
      name: "Connections",
      beta: true
    };
    authService.isRevalBeta = false;
    expect(service.showNavigationLink(menuItem)).toBeFalse();
  });

  it("should return true when link is in 'beta' and admin does have 'RevalBeta' permissions", () => {
    const menuItem: IMenuItem = {
      type: MenuType.INTERNAL,
      route: "/connections",
      name: "Connections",
      beta: true
    };
    authService.isRevalBeta = true;
    expect(service.showNavigationLink(menuItem)).toBeTrue();
  });

  it("should return false when link has roles and admin does not have a matching role", () => {
    const menuItem: IMenuItem = {
      type: MenuType.EXTERNAL,
      route: "admin/reference",
      name: "Admin",
      roles: ["Reference Site Admin"]
    };
    authService.roles = ["Some Other Role"];
    expect(service.showNavigationLink(menuItem)).toBeFalse();
  });

  it("should return true when link has roles and admin has a matching role", () => {
    const menuItem: IMenuItem = {
      type: MenuType.EXTERNAL,
      route: "admin/reference",
      name: "Admin",
      roles: ["Reference Site Admin"]
    };
    authService.roles = ["Reference Site Admin"];
    expect(service.showNavigationLink(menuItem)).toBeTrue();
  });

  describe("filterMenuItems", () => {
    it("should remove top-level items the admin does not have a role for", () => {
      const items: IMenuItem[] = [
        {
          type: MenuType.EXTERNAL,
          route: "admin/reference",
          name: "Admin",
          roles: ["Reference Site Admin"]
        },
        {
          type: MenuType.INTERNAL,
          route: "/connections",
          name: "Connections"
        }
      ];
      authService.roles = [];

      const result = service.filterMenuItems(items);

      expect(result).toHaveSize(1);
      expect(result[0].name).toBe("Connections");
    });

    it("should recursively filter nested menuItems", () => {
      const items: IMenuItem[] = [
        {
          type: MenuType.EXTERNAL,
          route: "admin/reference",
          name: "Admin",
          menuItems: [
            {
              type: MenuType.EXTERNAL,
              route: "admin/reference/college",
              name: "College",
              roles: ["Reference Site Admin"]
            },
            {
              type: MenuType.EXTERNAL,
              route: "admin/reference/country",
              name: "Country"
            }
          ]
        }
      ];
      authService.roles = [];

      const result = service.filterMenuItems(items);

      expect(result).toHaveSize(1);
      expect(result[0].menuItems).toHaveSize(1);
      expect(result[0].menuItems?.[0].name).toBe("Country");
    });
  });
});
