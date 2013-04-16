module M {
	export var name = "module M";
	export inline function toString(): string {
		return name;
	}
}
M.toString();