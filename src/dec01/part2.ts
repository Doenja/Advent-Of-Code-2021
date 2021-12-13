import { getIncreases, getInput } from "./part1";

function getWindowIncreases(input: number[]) {
    let windowTotals: number[] = [];

    input.forEach((measurement, i) => {
        windowTotals = [...windowTotals, measurement + input[i + 1] + input[i + 2]];
    });

    return getIncreases(windowTotals);
}

export function part2(file: string) {
    const input = getInput(file);
    return getWindowIncreases(input);
}
