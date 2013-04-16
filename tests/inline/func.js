var isTrue = /** @inline */function isTrue(x) {
    return x === true;
};
var headerHTML = /** @inline */function headerHTML(x) {
    return "<h1>" + x + "</h1>";
};
var headerMarkdown = /** @inline */function headerMarkdown(x) {
    return "==" + x + "==";
};
/** @inline */function header(x, html) {
    return ((html) === true) ? ("<h1>" + (x) + "</h1>") : ("==" + (x) + "==");
    // return headerHTML(x) || headerMarkdown(x);
    }
((((true)) === true) ? ("<h1>" + (("Caption!")) + "</h1>") : ("==" + (("Caption!")) + "=="));
