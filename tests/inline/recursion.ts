class C {
	n: number = 10;
	inline get length(): number {
		return this.n;
	}

	inline rec(): number {
		return this.length;
	}
}


var c = new C;
c.rec();

function g (x: number): number;
function f (x: number): number;

inline function g (x: number): number {
	return f(x - 1);
} 

inline function f (x: number): number {
	return g(x + 1);
}

f(1);
g(1);