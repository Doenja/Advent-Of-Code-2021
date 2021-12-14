import { readFileSync } from "fs";

export function getInput(file: string) {
    return readFileSync(file, "utf-8")
        .split("\n")
        .map((row) => row.split("").map(Number));
}

export function getAdjacents(input: number[][], x: number, y: number) {
    const N = input[y - 1] && typeof input[y - 1][x] === "number" ? input[y - 1][x] : Infinity;
    const E = input[y] && typeof input[y][x + 1] === "number" ? input[y][x + 1] : Infinity;
    const S = input[y + 1] && typeof input[y + 1][x] === "number" ? input[y + 1][x] : Infinity;
    const W = input[y] && typeof input[y][x - 1] === "number" ? input[y][x - 1] : Infinity;

    return [N, E, S, W];
}

export function findLows(input: number[][]) {
    const lowPoints: { x: number; y: number; nr: number }[] = [];

    input.forEach((row, y) => {
        row.forEach((nr, x) => {
            if (nr === 9) return;

            const adjacent = getAdjacents(input, x, y);

            if (Math.min(...adjacent, nr) === nr && !adjacent.includes(nr)) {
                lowPoints.push({ x, y, nr });
            }
        });
    });

    return lowPoints;
}

export function sumLows(lows: number[]) {
    return lows.map((nr) => nr + 1).reduce((cur, prev) => cur + prev);
}

export function part1(file: string) {
    const input = getInput(file);

    const lows = findLows(input);

    return sumLows(lows.map((low) => low.nr));
}
