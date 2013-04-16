typescript-inline
=================

Modification of the [TypeScript](http://typescript.codeplex.com/) with support for inline tag.

Currently it supports the following types of inline functions:

```javascript
inline function print(x) {
  console.log(x);
}

var fn = inline function print(...argv: any[]) {
  console.log(argv);
}

var isNull = (x) => x === null; //all arrow functions by default are inline

class C {
  private n: number = 100;
  inline length(): number {
    return this.n;
  }
  
  inline getLength() {
    return this.n;
  }
}
```

Of course, supported multilevel inlining like this:

```javascript
var isTrue = (x: bool): bool => x === true;
var version() = () => "1";
var versionFull() = () => "1.0.0 stable";
var ver = (full = false) => isTrue(full)? versionFull(): version();
```

__Currently supports inlining functions with only one statement - return statement.__
