class ObjectArray {
	data: any[] = [];
	inline value(i: number): any {
		return this.data[i];
	}
}

class Blend {
	slots: ObjectArray = null;
	data: number[];

	inline element(i: number): any {
		return this.data[i];
	}

	inline getSlotByIndex(i: number): any {
		return this.slots.value(this.element(i));
	}
}