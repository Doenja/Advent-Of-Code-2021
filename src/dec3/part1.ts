import { readFileSync } from "fs";

export function getInput(file: string) {
    return readFileSync(file, "utf-8")
        .split("\n")
        .map((number) => Array.from(number).map(Number));
}

export function getGamma(input: number[][]) {
    const totals = new Array(5).fill(0);

    input.forEach((arr) => {
        arr.forEach((number, i) => {
            totals[i] = totals[i] + number;
        });
    });

    return totals.map((total) => {
        return total / input.length > 0.5 ? 1 : 0;
    });
}

function getEpsilon(gamma: number[]) {
    return gamma.map((digit) => (digit === 1 ? 0 : 1));
}

export function part1(file: string) {
    const input = getInput(file);

    const gamma = getGamma(input);
    const epsilon = getEpsilon(gamma);

    return parseInt(gamma.join(""), 2) * parseInt(epsilon.join(""), 2);
}
