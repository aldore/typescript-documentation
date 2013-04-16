var C = (function () {
    function C() {
        this.n = null;
    }
    Object.defineProperty(C.prototype, "length", {
        get: /** @inline */function () {
            return this.n;
        },
        set: /** @inline */function (n) {
            this.n = n;
        },
        enumerable: true,
        configurable: true
    });
    return C;
})();
var c = new C();
(((((((c.n)).n)).n)).n);
// c.length = null;
// var d = c.length;
// //c.length = null;
// c.length.length.length;
(((((c.n)).n)).n = (null));
