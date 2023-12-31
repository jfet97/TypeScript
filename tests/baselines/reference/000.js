//// [tests/cases/compiler/000.ts] ////

//// [000.ts]
type test = { a: string } & { a: 5 }

declare const a: test

let b = a

//// [000.js]
"use strict";
var b = a;
