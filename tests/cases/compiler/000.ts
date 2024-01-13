// @strict: true
// @exactOptionalPropertyTypes: true
// @noEmit: true
// @skipLibCheck: true

// type T0 = GetLabels<[a: 1, b: 2, 3]>
// //    ^?

// type T1 = GetLabels<readonly [a: 1, b: 2, 3]>
// //    ^?

// type T2 = GetLabels<[a: 1, b: 2, c?: 3]> // TODO: I don't wanna '| undefined'
// //    ^?

// type T3 = GetLabels<[a: 1, b: 2, ...c: number[]]>
// //    ^?


type GetLabelsDeferred<X extends readonly any[]> = GetLabels<X> // [...X, 1, 2, 3] // GetLabels<X>;

type AddLevelOfIndirection<E extends readonly any[]> = E extends ["ciao"] ? never : GetLabelsDeferred<E>;

type T4 = AddLevelOfIndirection<[a: 1, b: 2, 3]> // TODO: it works with generics!!!
//    ^?


// type T5 = GetLabels<number[]>
// //    ^?

// type T6 = GetLabels<{a: "smt"}[] | [...label1: string[], label2: 2] | [...string[], label3: 3]>
// //    ^?

// type T7 = GetLabels<readonly number[]>
// //    ^?


// type GetLabelsWithTypeVariable<T> = GetLabels<[a: 1, b: T, 3]>;

// type T8 = GetLabelsWithTypeVariable<"unsure">
// //    ^?

type ToObject<T extends readonly any[]> = {
  [I in keyof GetLabels<T> as GetLabels<T>[I][0]]: GetLabels<T>[I][1]
}

type T9 = ToObject<[a: 1, b: 2, c: 3]>
//   ^?