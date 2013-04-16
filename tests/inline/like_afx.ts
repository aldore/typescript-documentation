
class E {
	e: E = new E;
	val = 100;
	inline getData(): number {
		return this.val;
	}
	inline getReturnType(): number {
		return this.e.getData();
	}
}

class C {
	_name: string = null;
	_pFunctionDefenition: E = new E;
	_pParent: C = null;

	inline getReturnType(): number {
		return this._pFunctionDefenition.getReturnType();
	}

	inline getType(): number {
		return <number>this.getReturnType();
	}

	inline getParent(): C {
		return this._pParent;
	}

	inline getParentType(): any {
		return (<C>(<any>this.getParent())).getType();
	}
}

var c: C = new C;

c.getType();
c.getParentType();


