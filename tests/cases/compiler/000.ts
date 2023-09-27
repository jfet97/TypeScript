type NewReturnType<T extends (...args: never) => any> = T extends (
  ...args: never
) => infer R
  ? R
  : any;

type Foo<D extends Record<string, unknown>> = {
  [P in keyof Record<string, unknown>]: "whatever" extends D ? 1 : 0
};

type T0 = ReturnType<<D extends Record<string, unknown>>(t: D) => Foo<D>>
  // ^?

type T1 = NewReturnType<<D extends Record<string, unknown>>(t: D) => Foo<D>>
  // ^?