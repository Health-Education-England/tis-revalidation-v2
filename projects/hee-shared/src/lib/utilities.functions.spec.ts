import { InjectScript } from "./utilities.functions";

describe("Utilites", () => {
  describe("InjectScript", () => {
    const src = "https://no-dmain.com/no.js";
    let scriptElement: HTMLScriptElement;

    it("should inject a <script element", () => {
      scriptElement = InjectScript(src, true, null);
      expect(scriptElement).toBeTruthy();
    });

    it("should have the src attribute same as injected", () => {
      scriptElement = InjectScript(src, true, null);
      expect(scriptElement.src).toEqual(src);
    });

    it("should resolve relative url to application", () => {
      const relativeSrc = "/no.js";
      const uri = (document as any).location.origin + relativeSrc;
      scriptElement = InjectScript(relativeSrc, true, null);
      expect(scriptElement.src).toEqual(uri);
    });

    it("should be async if set to true", () => {
      scriptElement = InjectScript(src, true, null);
      expect(scriptElement.async).toBeTrue();
    });

    it("should not have the async attribute when set to false", () => {
      scriptElement = InjectScript(src, false, null);
      expect(scriptElement.getAttribute("async")).toBeNull();
    });
  });
});
