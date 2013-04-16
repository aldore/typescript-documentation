/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.22/15.4.4.22-8-b-iii-1-18.js
 * @description Array.prototype.reduceRight - element to be retrieved is own accessor property without a get function on an Array
 */


function testcase() {

        var testResult = false;
        function callbackfn(prevVal, curVal, idx, obj) {
            if (idx === 1) {
                testResult = (typeof prevVal === "undefined");
            }
        }

        var arr = [0, 1];

        Object.defineProperty(arr, "2", {
            set: function () { },
            configurable: true
        });

        arr.reduceRight(callbackfn);
        return testResult;

    }
runTestCase(testcase);
