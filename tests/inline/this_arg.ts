class C {
	n: number = 10;
	inline total(t: number): number {
		return this.n + t;
	}
}

class K {
	n: number = 5;
	c: C = null;
	inline get example(): C {
		return this.c;
	}

	test () {
		this.example.total(this.n);
	}
}
