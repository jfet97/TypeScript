// @strict: true
// @lib: esnext
// @target: esnext
// @noEmit: true
// @skipLibCheck: true

function func<
    T1,
    T2 extends (context: T1) => void,
    T3 = {},
>(data: {
    T1: T1;
    T2: T2
}) {
}

func({
    T1: {
        aaa(){ return 333; },
    },
    T2: (context) => {
        context.aaa();
    }
});