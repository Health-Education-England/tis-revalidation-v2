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
