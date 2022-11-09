import { SplitStringToHTMLPipe } from "./split-string-to-html.pipe";
import { BrowserModule } from "@angular/platform-browser";
import { TestBed } from "@angular/core/testing";
describe("SplitStringToHTMLPipe", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule]
    });
  });

  it("create an instance", () => {
    const pipe = new SplitStringToHTMLPipe();
    expect(pipe).toBeTruthy();
  });

  it("should split string containing '|' into separate <span> elements ", () => {
    const pipe = new SplitStringToHTMLPipe();
    const text = pipe.transform("Hello|World", "|");
    expect(text).toContain("<span class='split-item'>Hello</span>");
    expect(text).toContain("<span class='split-item'>World</span>");
  });
});
