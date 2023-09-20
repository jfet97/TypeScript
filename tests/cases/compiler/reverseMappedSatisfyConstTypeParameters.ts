declare function foo<T>(t: {[K in keyof T]: T[K]} ): T

foo({
//^?
    a: 1,
    b: 2,
    nested: {
        c: 3
    }
}as const)


declare function bar<const T>(t: {[K in keyof T]: T[K]} ): T

bar({
//^?
    a: 1,
    b: 2,
    nested: {
        c: 3
    }
})