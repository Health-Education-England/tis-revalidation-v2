import { TestBed } from "@angular/core/testing";

import { UtilitiesService } from "./utilities.service";

describe("UtilitiesService", () => {
  let service: UtilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilitiesService);
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
});
