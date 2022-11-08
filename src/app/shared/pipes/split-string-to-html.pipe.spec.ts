import { SplitStringToHTMLPipe } from "./split-string-to-html.pipe";
import {
  BrowserModule,
  DomSanitizer,
  SafeHtml
} from "@angular/platform-browser";
import { TestBed } from "@angular/core/testing";
describe("SplitStringToHTMLPipe", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule]
    });
  });

  it("create an instance", () => {
    const domSanitizer = TestBed.inject(DomSanitizer);
    const pipe = new SplitStringToHTMLPipe(domSanitizer);
    expect(pipe).toBeTruthy();
  });

  it("should split string containing '|' into separate <span> elements ", () => {
    const domSanitizer = TestBed.inject(DomSanitizer);
    const pipe = new SplitStringToHTMLPipe(domSanitizer);
    const safeHtml: SafeHtml = pipe.transform("Hello|World", "|");
    const text = safeHtml["changingThisBreaksApplicationSecurity"];
    expect(text).toContain("<span class='split-item'>Hello</span>");
    expect(text).toContain("<span class='split-item'>World</span>");
  });
});
