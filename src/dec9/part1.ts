import { readFileSync } from "fs";

export function getInput(file: string) {
    return readFileSync(file, "utf-8")
        .split("\n")
        .map((row) => row.split("").map(Number));
}

function getAdjacents(input: number[][], x: number, y: number) {
    const N = input[y - 1] && typeof input[y - 1][x] === "number" ? input[y - 1][x] : Infinity;
    const E = input[y] && typeof input[y][x + 1] === "number" ? input[y][x + 1] : Infinity;
    const S = input[y + 1] && typeof input[y + 1][x] === "number" ? input[y + 1][x] : Infinity;
    const W = input[y] && typeof input[y][x - 1] === "number" ? input[y][x - 1] : Infinity;

    return [N, E, S, W];
}

export function filterlows(input: number[][]) {
    const lowPoints: number[] = [];

    input.forEach((row, iRow) => {
        row.forEach((nr, i) => {
            if (nr === 9) return;

            const adjacent = getAdjacents(input, i, iRow);

            if (Math.min(...adjacent, nr) === nr && !adjacent.includes(nr)) {
                lowPoints.push(nr);
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

    const lows = filterlows(input);

    return sumLows(lows);
}
