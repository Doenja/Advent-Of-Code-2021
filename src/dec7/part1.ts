import { readFileSync } from "fs";

export function getInput(file: string) {
    return readFileSync(file, "utf-8")
        .split(",")
        .map(Number)
        .sort((a, b) => a - b);
}

export function getDistance(input: number[], from: number, sumFormula: (a: number, b: number) => number) {
    let totalDistance = 0;

    input.forEach((position) => (totalDistance += sumFormula(position, from)));
    return totalDistance;
}

export function getBestPosition(input: number[]) {
    const isEven = input.length % 2 === 0;

    const index = isEven ? (Math.min(input.length / 2) + Math.min(input.length / 2)) / 2 : input.length / 2;

    return input[index];
}

export function part1(file: string) {
    const input = getInput(file);

    const bestPosition = getBestPosition(input);

    return getDistance(input, bestPosition, (a, b) => Math.abs(a - b));
}
