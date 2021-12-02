import { getIncreases, measurements } from "./part1";

function getWindowIncreases() {
    let windowTotals: number[] = [];

    measurements.forEach((measurement, i) => {
        windowTotals = [...windowTotals, measurement + measurements[i + 1] + measurements[i + 2]];
    });

    return getIncreases(windowTotals);
}

export const part2 = getWindowIncreases();
