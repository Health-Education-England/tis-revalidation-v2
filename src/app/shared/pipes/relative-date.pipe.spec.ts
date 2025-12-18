import { RelativeDatePipe } from "./relative-date.pipe";
import * as moment from "moment";

describe("RelativeDatePipe", () => {
  it("create an instance", () => {
    const pipe = new RelativeDatePipe();
    expect(pipe).toBeTruthy();
  });

  it("should return 'just now' when date is recent", () => {
    const pipe = new RelativeDatePipe();
    const text = pipe.transform(moment().toString());
    expect(text).toContain("just now");
  });

  it("should return '3 hours ago' when date was 3 hours ago", () => {
    const pipe = new RelativeDatePipe();
    const text = pipe.transform(moment().subtract(3, "hours").toString());
    expect(text).toContain("3 hours ago");
  });

  it("should return '2 day ago' when date was 2 days ago", () => {
    const pipe = new RelativeDatePipe();
    const text = pipe.transform(moment().subtract(2, "days").toString());
    expect(text).toContain("2 days ago");
  });

  it("should return formatted date when date is greater than 7 days ago", () => {
    const pipe = new RelativeDatePipe();
    const text = pipe.transform("2025-11-06T11:39:38.724");
    expect(text).toContain("6 Nov 2025 11:39");
  });
});
