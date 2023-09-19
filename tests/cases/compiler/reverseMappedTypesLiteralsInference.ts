interface WithNestedPropd {
  boolean?: boolean;
  prop?: string;
  value?: number;
  nested: {
    prop: string;
  },
  arr: unknown[];
}

declare function withNestedPropd<T extends WithNestedPropd>(props: { [K in keyof T | keyof WithNestedPropd]: T[K] }): T;


// things that now work as they should

const wnpd_test0 = withNestedPropd({
      // ^?
  boolean: false,
  prop: 'foo',
  value: 10,
  nested: { prop: 'bar' },
  extra: 10,
  arr: [1,2,3]
});

const wnpd_test1 = withNestedPropd({
      // ^?
  boolean: false,
  prop: 'foo',
  value: 10,
  nested: { prop: 'bar' } as { prop: 'bar' },
  extra: 10,
  arr: [1,2,3]
});

const wnpd_test2 = withNestedPropd({
      // ^?
  boolean: false,
  prop: 'foo',
  value: 10,
  nested: { prop: 'bar' },
  extra: 10,
  arr: [1,2,3] as [1,2,3]
});

const wnpd_test3 = withNestedPropd({
      // ^?
  boolean: false as const,
  prop: 'foo',
  value: 10,
  nested: { prop: 'bar' },
  extra: 10,
  arr: [1,2,3]
});

const wnpd_test4 = withNestedPropd({
      // ^?
  boolean: false,
  prop: 'foo' as const,
  value: 10,
  nested: { prop: 'bar' },
  extra: 10,
  arr: [1,2,3]
});

const wnpd_test5 = withNestedPropd({
      // ^?
  boolean: false,
  prop: 'foo',
  value: 10 as const,
  nested: { prop: 'bar' },
  extra: 10,
  arr: [1,2,3]
});

const wnpd_test6 = withNestedPropd({
      // ^?
  boolean: false,
  prop: 'foo',
  value: 10,
  nested: { prop: 'bar' } as const,
  extra: 10,
  arr: [1,2,3]
});

const wnpd_test7 = withNestedPropd({
      // ^?
  boolean: false,
  prop: 'foo',
  value: 10,
  nested: { prop: 'bar' },
  extra: 10 as const,
  arr: [1,2,3]
});

const wnpd_test8 = withNestedPropd({
      // ^?
  boolean: false,
  prop: 'foo',
  value: 10,
  nested: { prop: 'bar' },
  extra: 10,
  arr: [1,2,3] as const
});

const wnpd_test9 = withNestedPropd({
      // ^?
  boolean: false,
  prop: 'foo',
  value: 10,
  nested: { prop: 'bar' },
  extra: 10,
  arr: [1,2,3]
} as const);

// things that still don't work

const wnpd_test10 = withNestedPropd({
      // ^?
  boolean: false as false,
  prop: 'foo',
  value: 10,
  nested: { prop: 'bar' },
  extra: 10,
  arr: [1,2,3]
});

const wnpd_test11 = withNestedPropd({
      // ^?
  boolean: false,
  prop: 'foo' as 'foo',
  value: 10,
  nested: { prop: 'bar' },
  extra: 10,
  arr: [1,2,3]
});

const wnpd_test12 = withNestedPropd({
      // ^?
  boolean: false,
  prop: 'foo',
  value: 10 as 10,
  nested: { prop: 'bar' },
  extra: 10,
  arr: [1,2,3]
});

const wnpd_test13 = withNestedPropd({
      // ^?
  boolean: false,
  prop: 'foo',
  value: 10,
  nested: { prop: 'bar' },
  extra: 10 as 10,
  arr: [1,2,3]
});

const wnpd_test14 = withNestedPropd({
      // ^?
  boolean: false,
  prop: 'foo',
  value: 10,
  nested: { prop: 'bar' },
  extra: 10,
  arr: [1,2,3]
} as { boolean: false, prop: 'foo', value: 10, nested: { prop: 'bar' }, extra: 10, arr: [1,2,3] });

// we say goodbye to optional properties
const wnpd_test15 = withNestedPropd({
      // ^?
  nested: { prop: 'bar' },
  extra: 10,
  arr: [1,2,3]
});

// WithNestedPropd has no readonly properties, but if it did we would say goodbye to readonly properties too