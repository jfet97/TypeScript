
export type IsNotEqual<A, B> =
  (<T>() => T extends A ? 1 : 2) extends
  (<T>() => T extends B ? 1 : 2) ? false : true

export interface Foo<X> {
  prop: IsNotEqual<X, ArrayConstructor>
}

type Mapping<
  X,
  E extends Foo<X> = Foo<X>
> = {
  [K in keyof E as IsNotEqual<E[K], true> extends false ? K : "weird"]: "whatever"
}

type A1 = ObjectConstructor extends infer T ? Mapping<T> : never
//   ^?
type A2 = { a: "ciao" } extends infer BBB ? keyof Mapping<BBB> : 5
//   ^?
