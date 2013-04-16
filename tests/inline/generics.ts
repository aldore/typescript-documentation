interface I<T> {
	n: T;
}

class C implements I {
	n: any = 10;
}

var c: I = new C();
c.n;