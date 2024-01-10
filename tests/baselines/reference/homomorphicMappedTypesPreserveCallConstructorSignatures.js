//// [tests/cases/compiler/homomorphicMappedTypesPreserveCallConstructorSignatures.ts] ////

//// [homomorphicMappedTypesPreserveCallConstructorSignatures.ts]
type YesWithRenaming<T> = { [P in keyof T as `${P & string}bla`]: { value: YesWithRenaming<T[P]> } };
type YesWithoutRenaming<T> = { [P in keyof T]: { value: YesWithoutRenaming<T[P]> } };
type NoBecauseNotHomomorphic<T> = { [P in keyof T & PropertyKey]: { value: NoBecauseNotHomomorphic<T[P]> } };

interface Foo {
  (): string;
  (x: number): number;
  prop: string;
}

interface Test {
  a: string;
  b: number;
  (): boolean;
  new(arg: unknown): { prop: unknown}
  readonly nested: {
    (): string;
    c?: boolean;
    new(arg: unknown): { prop: unknown}
    readonly d: Foo
  }
}

type T1 = YesWithRenaming<Test>
type T2 = YesWithoutRenaming<Test>
type T3 = NoBecauseNotHomomorphic<Test>

//// [homomorphicMappedTypesPreserveCallConstructorSignatures.js]
"use strict";
