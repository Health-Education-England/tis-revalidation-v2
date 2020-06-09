import { StripHtmlPipe } from "./strip-html.pipe";
import { DOCUMENT } from "@angular/common";
import { TestBed } from "@angular/core/testing";

describe("StripHtmlPipe", () => {
  let _document: Document;

  beforeEach(() => {
    _document = TestBed.inject(DOCUMENT);
  });

  it("create an instance", () => {
    const pipe = new StripHtmlPipe(_document);
    expect(pipe).toBeTruthy();
  });

  it("one level html", () => {
    const pipe = new StripHtmlPipe(_document);
    const txt = pipe.transform("<div>the rain in spain</div>");
    expect(txt).toEqual("the rain in spain");
  });

  it("multi level html", () => {
    const pipe = new StripHtmlPipe(_document);
    const txt = pipe.transform(`
    <div>
    <h1>the rain in spain</h1> <p>stays mainly in <em>the plane</em></p>
    </div>
    `);
    expect(txt).toEqual(`the rain in spain stays mainly in the plane`);
  });
});
