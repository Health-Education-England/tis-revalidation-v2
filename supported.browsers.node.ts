const browserRegEx = require("browserslist-useragent-regexp");

if (!browserRegEx) {
  throw new Error(
    "browserslist-useragent-regexp is needed, please run npm browserslist-useragent-regexp --save-dev"
  );
}

const supportedRegEx = browserRegEx.getUserAgentRegExp({
  allowHigherVersions: true
});
const fs = require("fs");

const content = `
// This file is generated via a node script supported.browsers.node.ts triggered by npm start/build 
(function() {
  var sb = ${supportedRegEx};
  if (sb.test(navigator.userAgent) === false &&
  /Chrome-Lighthouse/.test(navigator.userAgent) === false) {
    window.location.replace(
      "assets/browser-support/browser-not-supported.html"
    );
  }
})();
`;

fs.writeFile(
  "./src/assets/browser-support/supported.browsers.js",
  content,
  (err) => {
    if (err) {
      console.error(err);
      return;
    }
  }
);
