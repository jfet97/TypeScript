// @strict: true

// type MyPick<T, P extends keyof T> = {
//   [K in P]: { value: T[K] };
// }

// declare function unvalueify<T, K extends keyof T>(t: MyPick<T, K>, keys: K[]): T;

// // T inferito come { a: string; b: string; }
// unvalueify({
//   a: { value: "a" },
//   b: { value: "b" },
// }, ["a", "b"]);

// declare function unvalueify<T, K extends keyof T>(t: Pick<T, K>, keys: K[]): T;

// // T inferito come { a: string; b: string; }
// unvalueify({
//   a: { value: "a" },
//   b: { value: "b" },
// }, ["a", "b"]);





// type Resolve<T> = { [K in keyof T]: T[K] } & unknown

type MyTest<T> = {
  [K in keyof (T extends "bau" ? keyof T : {})]: 7
}

// type EE = MyTest<Obj>

declare function foo<T>(a: MyTest<T>): T;

foo({  miaotest: 2 });

// ^?

// type Instance = Resolve<[1,2,3]>

// type PickHom<T, K extends keyof T, E extends PropertyKey = K> = {
//   [P in keyof T as P extends K | E ? P : never]: T[P];
// };

// type Instance = PickHom<Obj, "a">

// getHomomorphicTypeVariable usata per ottenere la type variable omomorfa se lo è omomorfa

// function getHomomorphicTypeVariable(type: MappedType) {
//         const constraintType = getConstraintTypeFromMappedType(type);
//         if (constraintType.flags & TypeFlags.Index) {
//             // siccome i flags sono potenze di 2, se il flag è presente allora il risultato è diverso da 0
//             // che flag? quello di essere TypeFlags.Index cioè un keyof T
//
//             const typeVariable = getActualTypeVariable((constraintType as IndexType).type);
//             if (typeVariable.flags & TypeFlags.TypeParameter) {
//                 T potrebbe boh essere un literal oggetto, noi vogliamo che sia una type variable, uno degli input
//                 return typeVariable as TypeParameter;
//             }
//         }
//         return undefined;
//     }