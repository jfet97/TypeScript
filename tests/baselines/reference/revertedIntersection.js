//// [tests/cases/compiler/revertedIntersection.ts] ////

//// [revertedIntersection.ts]
type StateConfig<TAction extends string> = {
  entry?: TAction
  states?: Record<string, StateConfig<TAction>>;
};

type StateSchema = {
  states?: Record<string, StateSchema>;
};

declare function createMachine<
  TConfig extends StateConfig<TAction>,
  TAction extends string = TConfig["entry"] extends string ? TConfig["entry"] : string,
>(config: { [K in keyof TConfig & keyof StateConfig<TAction>]: TConfig[K] }): [TAction, TConfig];

const inferredParams1 = createMachine({
  entry: "foo",
  states: {
    a: {
      entry: "bar",
    },
  },
  extra: 12,
});

const inferredParams2 = createMachine({
  entry: "foo",
  states: {
    a: {
      entry: "foo",
    },
  },
  extra: 12,
});


// -----------------------------------------------------------------------------------------

const checkType = <T>() => <U extends T>(value: { [K in keyof U & keyof T]: U[K]}) => value;

const checked = checkType<{x: number, y: string}>()({
  x: 1 as number,
  y: "y",
  z: "z", // undesirable property z is *not* allowed
});

 checked;
  // ^?

//// [revertedIntersection.js]
var inferredParams1 = createMachine({
    entry: "foo",
    states: {
        a: {
            entry: "bar",
        },
    },
    extra: 12,
});
var inferredParams2 = createMachine({
    entry: "foo",
    states: {
        a: {
            entry: "foo",
        },
    },
    extra: 12,
});
// -----------------------------------------------------------------------------------------
var checkType = function () { return function (value) { return value; }; };
var checked = checkType()({
    x: 1,
    y: "y",
    z: "z", // undesirable property z is *not* allowed
});
checked;
// ^?
