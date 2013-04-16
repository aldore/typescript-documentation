
var isTrue = inline function isTrue (x: bool) { return x === true }
var headerHTML = inline function headerHTML(x: string): string { return "<h1>" + x + "</h1>" };
var headerMarkdown = inline function headerMarkdown (x: string): string { return "==" + x + "=="; }

inline function header(x: string, html?: bool): string {
	return isTrue(html)? headerHTML(x): headerMarkdown(x);
	// return headerHTML(x) || headerMarkdown(x);
}

header("Caption!", true);