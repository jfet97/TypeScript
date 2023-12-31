// @strict:true

type First<T extends readonly any[]> = T extends [infer U, ...any[]] ? U : never;

type test1 = First<[1, 2, 3]>
//    ^?