class C {
	n: C = null;
	inline get length(): C { return this.n; }
	inline set length(n: C) {
		this.n = n;
	}
	
}
var c = new C;
c.length.length.length.length;
// c.length = null;
// var d = c.length;
// //c.length = null;
// c.length.length.length;
c.length.length.length = null;

