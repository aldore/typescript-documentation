var akra;
(function (akra) {
    (function (core) {
        core.min = Math.min;
        core.max = Math.max;
        (function (math) {
            math.clamp = /** @inline */function (value, low, high) {
                return core.max(low, core.min(value, high));
            };
        })(core.math || (core.math = {}));
        var math = core.math;
    })(akra.core || (akra.core = {}));
    var core = akra.core;
})(akra || (akra = {}));
var akra;
(function (akra) {
    (function (pool) {
        var Pool = (function () {
            function Pool() {
                this.n = 25;
            }
            Pool.prototype.init = function () {
                var t = (/*checked (origin: core)>>*/akra.core.max((0), /*checked (origin: core)>>*/akra.core.min((this.n), (10))));
            };
            return Pool;
        })();
        pool.Pool = Pool;        
    })(akra.pool || (akra.pool = {}));
    var pool = akra.pool;
})(akra || (akra = {}));
var akra;
(function (akra) {
    (function (x) {
        (/*checked (origin: core)>>*/akra.core.max((0), /*checked (origin: core)>>*/akra.core.min((10), (20))));
    })(akra.x || (akra.x = {}));
    var x = akra.x;
})(akra || (akra = {}));
