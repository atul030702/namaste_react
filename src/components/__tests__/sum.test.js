import { sum } from "../sum.js";

test("sum function should calculate the sum of two numbers", () => {
    const result = sum(3, 4);

    //assertion line
    expect(result).toBe(7);
});