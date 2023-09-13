//// [tests/cases/compiler/0test.ts] ////

//// [0test.ts]
type Obj = {
  a: 1;
  readonly foo: "";
};

type Resolve<T> = { [K in keyof T as `${K & string}`]: T[K] }

declare function foo<T>(a: Resolve<T>): T;

foo({ bau: 1, miao: 2 });

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
//                 T potrebbe boh essere una unione di stringhe, noi vogliamo che sia una type variable
//                 return typeVariable as TypeParameter;
//             }
//         }
//         return undefined;
//     }

//// [0test.js]
"use strict";
foo({ bau: 1, miao: 2 });
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
//                 T potrebbe boh essere una unione di stringhe, noi vogliamo che sia una type variable
//                 return typeVariable as TypeParameter;
//             }
//         }
//         return undefined;
//     }
