interface ISomeInterface {
    a: number;
    b: number;
}

class SomeClass {
	d: string = "a";
}

var _total: number = 0;
function sid(iTmp: number = 1): number {
	return ++_total;
}

var a: bool = true;
var b: number = sid(22);
var c = null;
var d: string = "some";
var e: ISomeInterface = <ISomeInterface>{};
var f: ISomeInterface = {
	a: 2,
	b: 2
}
var g = new SomeClass();
var h = [];
var i = [1, 2, 3, 4];
var j = a;
var k = 3;
var l = -k;