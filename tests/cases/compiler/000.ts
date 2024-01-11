// @strict: true
// @exactOptionalPropertyTypes: true

type T0 = GetLabels<[a: 1, b: 2, 3]>
//    ^?

type T1 = GetLabels<readonly [a: 1, b: 2, 3]>
//    ^?

type T2 = GetLabels<[a: 1, b: 2, c?: 3]> // TODO: I don't wanna '| undefined'
//    ^?

type T3 = GetLabels<[a: 1, b: 2, ...c: number[]]>
//    ^?

type GetLabelsDeferred<T extends readonly any[]> = GetLabels<T>;

type T4 = GetLabelsDeferred<[a: 1, b: 2, 3]> // TODO: doesn't work with generics yet
//  ^?