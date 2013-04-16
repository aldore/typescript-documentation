module akra.core {
	export var min = Math.min;
	export var max = Math.max;
	
	export module math {
		export var clamp = (value: number, low: number, high: number): number => 
			max(low, min(value, high));
	}
}

module akra.pool {
	export class Pool {
		n: number = 25;
		init(): void {
			var t = akra.core.math.clamp(this.n, 0, 10)
		}
	}
}

module akra.x {
	core.math.clamp(10, 0, 20);
}