// @strict: true
// @exactOptionalPropertyTypes: true
// @noEmit: true
// @skipLibCheck: true

type T0 = GetLabels<[a: 1, b: 2, 3]>
//    ^?

type T1 = GetLabels<readonly [a: 1, b: 2, 3]>
//    ^?

type T2 = GetLabels<[a: 1, b: 2, c?: 3]> // TODO: I don't wanna '| undefined'
//    ^?

type T3 = GetLabels<[a: 1, b: 2, ...c: number[]]>
//    ^?

type GetLabelsDeferred<X extends readonly any[]> = GetLabels<X>;

type AddLevelOfIndirection<E extends readonly any[]> = E extends ["ciao"] ? never : GetLabelsDeferred<E>;

type T4 = AddLevelOfIndirection<[a: 1, b: 2, 3]>
//   ^?

type T5 = GetLabels<number[]>
//    ^?

type T6 = GetLabels<{a: "smt"}[] | [...label1: string[], label2: 2] | [...string[], label3: 3]>
//    ^?

type T7 = GetLabels<readonly number[]>
//    ^?

type GetLabelsWithTypeVariable<T> = GetLabels<[a: 1, b: T, 3]>;

type T8 = GetLabelsWithTypeVariable<"should be ok">
//    ^?

type KeyofGetLabels<T extends readonly any[]> = [keyof GetLabels<T>, keyof GetLabels<T> & `${number}`]

type T9 = KeyofGetLabels<[a: 1, b: 2, c: 3]>
//   ^?

type ConditionalGetLabels<B extends boolean, T extends readonly any[], U extends readonly any[]> =
  GetLabels<B extends true ? T : U>

type T10 = ConditionalGetLabels<true, [a: 1, b: 2, c: 3], [x: "x", y: "y", z: "z"]>
//   ^?

type T11 = ConditionalGetLabels<false, [a: 1, b: 2, c: 3], [x: "x", y: "y", z: "z"]>
//   ^?

type IndexedAccess<I extends number> = [GetLabels<[a: 1, b: 2, c: 3]>[I][0], GetLabels<[a: 1, b: 2, c: 3]>[I][1]]

type T12 = IndexedAccess<1>
//   ^?

type IndexedAccessToBeDeferred<T extends readonly any[], I extends number> = GetLabels<T>[I]

type T13 = IndexedAccessToBeDeferred<[a: 1, b: 2, c: 3], 1>
//   ^?

type IndexedAccessToBeDeferred2<T extends readonly any[], I extends number> = [GetLabels<T>[I][0], GetLabels<T>[I][1]]

type T14 = IndexedAccessToBeDeferred2<[a: 1, b: 2, c: 3], 1>
//   ^?

type ToObject<T extends readonly [string, any][]> = {
  [I in keyof T & `${number}` as T[I][0] ]: T[I][1]
}

type T15 = ToObject<GetLabels<[a: 1, b: 2, c: 3]>>
//   ^?

type ConditionalCheckType<T extends readonly any[], U extends readonly [string, any][]> =
  GetLabels<T> extends U ? true : false

type ConditionalExtendsType<T extends readonly any[], U extends readonly [string, any][]> =
  U extends GetLabels<T> ? true : false

type T16 = ConditionalCheckType<[a: 1, b: 2, c: 3], GetLabels<[a: 1, b: 2, c: 3]>>
//   ^?

type T17 = ConditionalExtendsType<[a: 1, b: 2, c: 3], GetLabels<[a: 1, b: 2, c: 3]>>
//   ^?

type ToObject2<T extends readonly any[]> =
  GetLabels<T> extends infer $Labels extends readonly [string, any][]
    ? { [I in keyof $Labels & `${number}` as $Labels[I][0]]: $Labels[I][1] }
    : never

type T18 = ToObject2<[a: 1, b: 2, c: 3]>
//   ^?