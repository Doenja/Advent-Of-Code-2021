import { readFileSync } from "fs";

export function getInput(file: string) {
    return readFileSync(file, "utf-8").split(",").map(Number);
}

export function getDistance(input: number[], from: number, sumFormula: (a: number, b: number) => number) {
    let totalDistance = 0;

    input.forEach((position) => (totalDistance += sumFormula(position, from)));
    return totalDistance;
}

export function getFuel(input: number[]) {
    const fuels = input.map((position) => getDistance(input, position, (a, b) => Math.abs(a - b)));

    return Math.min(...fuels);
}

export function part1(file: string) {
    const input = getInput(file);

    return getFuel(input);
}
