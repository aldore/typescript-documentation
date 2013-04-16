var E = (function () {
    function E() {
        this.e = new E();
        this.val = 100;
    }
    E.prototype.getData = /** @inline */function () {
        return this.val;
    };
    E.prototype.getReturnType = /** @inline */function () {
        return ((this.e).val);
    };
    return E;
})();
var C = (function () {
    function C() {
        this._name = null;
        this._pFunctionDefenition = new E();
        this._pParent = null;
    }
    C.prototype.getReturnType = /** @inline */function () {
        return ((((this._pFunctionDefenition).e).val));
    };
    C.prototype.getType = /** @inline */function () {
        return ((((((this)._pFunctionDefenition).e).val)));
    };
    C.prototype.getParent = /** @inline */function () {
        return this._pParent;
    };
    C.prototype.getParentType = /** @inline */function () {
        return ((((((((((((this)._pParent)))))._pFunctionDefenition).e).val))));
    };
    return C;
})();
var c = new C();
(((((((c)._pFunctionDefenition).e).val))));
(((((((((((((c)._pParent)))))._pFunctionDefenition).e).val)))));
