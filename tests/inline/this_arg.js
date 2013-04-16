var C = (function () {
    function C() {
        this.n = 10;
    }
    C.prototype.total = /** @inline */function (t) {
        return this.n + t;
    };
    return C;
})();
var K = (function () {
    function K() {
        this.n = 5;
        this.c = null;
    }
    Object.defineProperty(K.prototype, "example", {
        get: /** @inline */function () {
            return this.c;
        },
        enumerable: true,
        configurable: true
    });
    K.prototype.test = function () {
        ((((this).c)).n + (this.n));
    };
    return K;
})();
