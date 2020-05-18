/**
 * This file will host re-usable functions
 */

/**
 * re-usable function to inject script into html header
 * @param src script source location
 * @param async load asynchronous
 * @param doc // ideally inject angular DOCUMENT optional
 */
export function InjectScript(
  src: string,
  async: boolean,
  doc?: Document
): HTMLScriptElement {
  // ideally inject angular @DOCUMENT
  if (!doc) {
    doc = document as any;
  }
  const script = doc.createElement("script");
  script.setAttribute("src", src);
  if (async) {
    script.setAttribute("async", "");
  }
  doc.head.appendChild(script);
  return script;
}
/**
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content
 * https://support.mozilla.org/en-US/questions/1248200
 * Not supported in firefox, safari. Import once in polyfills.ts or appComponent
 */
export function PreloadStyleSheet(): void {
  const doc = document as any;
  const styleSheetLink = doc.createElement("link");
  const supportsPreload = styleSheetLink.relList.supports("preload");
  if (!supportsPreload) {
    const preLoads = doc.head.querySelectorAll(
      'link[rel="preload"][as="style"]'
    );
    preLoads.forEach((element: HTMLLinkElement) => {
      element.setAttribute("rel", "stylesheet");
    });
  }
}
