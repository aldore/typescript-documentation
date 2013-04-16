var C = (function () {
    function C() {
        this.n = 10;
    }
    Object.defineProperty(C.prototype, "length", {
        get: /** @inline */function () {
            return this.n;
        },
        enumerable: true,
        configurable: true
    });
    C.prototype.rec = /** @inline */function () {
        return ((this).n);
    };
    return C;
})();
var c = new C();
(((c).n));
/** @inline */function g(x) {
    return f(x - 1);
}
/** @inline */function f(x) {
    return g(x + 1);
}
f(1);
g(1);
