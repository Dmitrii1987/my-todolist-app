import { sum } from "./01";

test('sum should be correct', () => {
    // data
    let a = 1;
    let b = 2;
    let c = 3

    //action
    let result1 = sum(a,b);
    let result2 = sum(b,c);

    // expect result
    expect(result1).toBe(3);
    expect(result2).toBe(5);
})