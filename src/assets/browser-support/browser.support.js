
(function () {
    try {
        var isIE = (/*@cc_on ! @*/ false);
        var docMode = document.documentMode;
        if (isIE && docMode === 10) {
            window.location.replace("assets/browser-support/browser-not-supported.html");
        }
    } catch{}
})();