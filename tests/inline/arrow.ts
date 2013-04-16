var iTotal: number = 0;
var sid = inline(): number => (iTotal);

var arrowFunc = (): number => sid();

var fatArrowFunc = (): string => {
	return null;
};

arrowFunc();
fatArrowFunc();