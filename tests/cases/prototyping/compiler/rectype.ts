module M {
    interface I { (i:I):I; }

    export function f(p:I)=>f;

    var i:I;

    f(i);
    f(f(i));
    f((f(f(i))));
}

