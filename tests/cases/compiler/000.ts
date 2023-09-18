interface Test {
  a: number,
  b: string,
  c: boolean
}

revert({ a: 1, b: '2', c: true, extra: 35 })


declare function revert<const T extends Test>(t: { [P in keyof T & keyof Test]: T[P] }): T