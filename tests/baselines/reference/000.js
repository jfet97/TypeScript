//// [tests/cases/compiler/000.ts] ////

//// [000.ts]
// declare function test1<T>(arg: {
//   producer: (s: string) => T,
//   consumer: (_: T) => void
// }): T;

declare function test2<T>(arg: {
  [K in keyof T]: {
    producer: (s: string) => T[K],
    consumer: (_: T[K]) => void
  };
}): T;

// const result1 = test1({
//   producer: (s) => s.length,
//   consumer: (x) => console.log(x),
// });

const result = test2({
  a: {
    producer: () => 123,
    consumer: (x) => 0,
  },
  // b: {
  //   producer: () => false,
  //   consumer: (x) => 0,
  // },
  // c: {
  //   producer: () => false,
  //   consumer: (x) => 0,
  // },
});

//// [000.js]
"use strict";
// declare function test1<T>(arg: {
//   producer: (s: string) => T,
//   consumer: (_: T) => void
// }): T;
// const result1 = test1({
//   producer: (s) => s.length,
//   consumer: (x) => console.log(x),
// });
var result = test2({
    a: {
        producer: function () { return 123; },
        consumer: function (x) { return 0; },
    },
    // b: {
    //   producer: () => false,
    //   consumer: (x) => 0,
    // },
    // c: {
    //   producer: () => false,
    //   consumer: (x) => 0,
    // },
});
